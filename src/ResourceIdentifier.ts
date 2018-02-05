// Dependencies ---------------------------------------------------------------
import { Request, Response, NextFunction, Handler } from "express";
import { RequestError } from "./error";
import { sortAcceptHeader } from "./helpers";

// ResourceIdentifier implementation ------------------------------------------
/**
 * A ResourceIdentifier is used to describe the mapping of a Resource to the entities covered by it.
 * 
 * Use one ResourceIdentifier for each mapping you want to create to an entity. For example, [a list of all movies](https://github.com/danepod/movie-database/blob/master/src/resources/movie/list/index.ts) and [one particular movie](https://github.com/danepod/movie-database/blob/master/src/resources/movie/detail/index.ts).
 */
export class ResourceIdentifier {
    /**
     * An array of keywords, describing the ResourceIdentifier. Useful for some hypermedia formats which use a self-describing string or array of strings for self-description, e.g. the `class` property of Siren.
     */
    keywords: string[] = [];

    /**
     * The sub-URL of this ResourceIdentifier. When generating an express Router from a Resource, the sub-URL will be appended to the base URL of the Resource.
     * 
     * For example: `/movies` is the base URL defined in the Resource, `/:id` is the defined sub-URL in the ResourceIdentifier. The resulting URL for the Router will be `/movies/:id`.
     */
    url: string;

    /**
     * Object containing all route handlers of a ResourceIdentifier instance.
     */
    handlers: {
        [method: string]: {
            [format: string]: Handler
        }
    } = {};

    /**
     * 
     * @param url Sub-URL of this ResouceIdentifier, supports express route parameters (e.g. `/:id`. This gets appended to the Resources base URL to form the full URL of the resulting express Router.
     * @param keywords Keywords describing the nature of this ResourceIdentifiers entitiy. Can be a single string or an array of strings. Optional.
     */
    constructor(url: string, keywords?: string | string[]) {
        this.url = url;

        if (keywords) {
            const currentKeywords: string[] = Array.isArray(keywords) ? keywords : [keywords];
            this.keywords.push(...currentKeywords);
        }
    }

    /**
     * Add route handlers to this ResourceIdentifier.
     * 
     * Call this method for every format you want to deliver.
     * @param format MIME type of the format to be used, e.g. `application/vnd.siren+json`. Note that each adapter exports this through the `mime` property so you may use `Siren.mime` instead.
     * @param handlers Object containing all route handlers for each HTTP method for the above defined MIME tyoe. Example `{ "GET": (req, res, next) => res.json(...), "POST": ... }`
     * @param fallback Set this to `true`, if you want this format to act as a fallback in case an HTTP client accepts no format defined in this ResourceIdentifier but states it could handle any format. 
     * 
     * If no format has set this to `true`, each request that doesn't accept any of the defined formats will yield an HTTP 406 (Not Acceptable) error. 
     * 
     * Setting multiple formats to be the fallback format will cause the last evaluated format to act as the fallback. 
     * 
     * Optional, default `false`.
     */
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

    /**
     * This method bundles all format handlers for every HTTP verb and format by creating a route handler that performs content negotiation.
     * 
     * Usually, you do not need to call this method in an application that uses this library as it gets called when using getExpressRouter() from a Resource instance.
     */
    getRoute(): {
        [method: string]: Handler
    } {
        const route: {
            [method: string]: Handler
        } = {};

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