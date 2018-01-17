// Dependencies ---------------------------------------------------------------
import { Route } from "./interfaces";
import { Request, Response, NextFunction, Handler } from "express";
import { RequestError } from "./error";

// Representation implementation ----------------------------------------------
export class Representation {
    keywords: string[] = [];
    url: string;
    handlers: {
        [method: string]: {
            [format: string]: Handler
        }
    } = {};

    constructor(url: string, keywords?: string | string[]) {
        this.url = url;

        if (keywords) {
            const currentKeywords: string[] = Array.isArray(keywords) ? keywords : [keywords];
            this.keywords.push(...currentKeywords);
        }
    }

    addHandlers(
        format: string,
        handlers: { [method: string]: Handler },
        fallback: boolean = false
    ) {
        for (const method in handlers) {
            const methodHandler = handlers[method];

            this.handlers[method] = this.handlers[method] || {};
            this.handlers[method][format] = methodHandler;

            if (fallback) {
                this.handlers[method]["default"] = methodHandler;
            }
        }
    }

    getRoute(): Route {
        const route: Route = {};

        for (const method in this.handlers) {
            if (this.handlers.hasOwnProperty(method)) {
                const currentMethod = this.handlers[method];

                route[method] = (req: Request, res: Response, next: NextFunction) => {
                    const accepts = sortAcceptHeader(req.header('Accept') || "*/*");

                    // Search the accept header for supported formats, return the first supported format
                    const formatMatch = accepts.find(format => {
                        return currentMethod[format] !== undefined;
                    });

                    if (formatMatch) {
                        // Handler for requested format found
                        return currentMethod[formatMatch](req, res, next);
                    } else if (currentMethod['default'] && accepts.some(format => format === '*/*')) {
                        // Client is also happy with a fallback
                        return currentMethod['default'](req, res, next);
                    } else {
                        // Neither the requested format or a fallback are sufficient
                        throw new RequestError('Format not supported', 406);
                    }
                }

            }
        }

        return route;
    }
}

// Helpers --------------------------------------------------------------------
/**
 * Parses the Accept Header mostly according to RFC2616 Sec. 14.1
 * Note that this doesn't handle any additional parameters besides quality (;q=...), it discards them instead
 * @param accepts The recieved Accept header
 */
export function sortAcceptHeader(accepts: string): string[] {
    // Regex that matches every format and each formats q value, ignoring the rest
    const regex = RegExp(/([\w*]+\/[\w.+\*]+)(?:(?:;)(?:(?:q=)(\d(?:.\d)?)|(?:[\w]*=)(?:\d(?:.\d)?)))*/,'g');
    let regexMatches;
    
    const accQuality: {
        format: string,
        quality: number
    }[] = [];

    // Extract formats with their corresponding qualities
    while ((regexMatches = regex.exec(accepts)) !== null) {
        accQuality.push({
            format: regexMatches[1],
            quality: Number(regexMatches[2]) || 1
        });
    }
    
    // Sort array by quality, descending
    accQuality.sort((a, b) => {
        return b.quality - a.quality
    });
    
    let result: string[] = [];
    
    // Copy the formats in descending order of quality, omitting the quality value
    accQuality.forEach((element) => {
        result.push(element.format);
    });

    // Delete duplicates
    result = [...new Set(result)];

    return result;
}