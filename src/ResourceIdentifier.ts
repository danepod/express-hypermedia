// Dependencies ---------------------------------------------------------------
import { Route } from "./interfaces";
import { Request, Response, NextFunction, Handler } from "express";
import { RequestError } from "./error";
import { sortAcceptHeader } from "./helpers";

// ResourceIdentifier implementation ----------------------------------------------
export class ResourceIdentifier {
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
                    const accepts = sortAcceptHeader(req.header('Accept'));

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