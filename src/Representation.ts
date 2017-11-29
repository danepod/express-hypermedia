// Dependencies ---------------------------------------------------------------
import { Route, HandlerMap } from "./interfaces";
import { Request, Response, NextFunction } from "express";

// Representation implementation ----------------------------------------------
export class Representation {
    keywords: string[] = [];
    url: string;
    handlers: HandlerMap = {};

    constructor(url: string) {
        this.url = url;
    }

    addKeywords(keywords: string | string[]): void {
        const currentKeywords: string[] = Array.isArray(keywords) ? keywords : [keywords];
        this.keywords.push(...currentKeywords);
    }

    getRoute(): Route {
        const route: Route = {};

        for (const method in this.handlers) {
            if (this.handlers.hasOwnProperty(method)) {
                const currentMethod = this.handlers[method];

                route[method] = (req: Request, res: Response, next: NextFunction) => {
                    const accepts = req.header('Accept');

                    if (accepts !== undefined && accepts !== '*/*') {
                        if (currentMethod[accepts] !== undefined) {
                            return currentMethod[accepts](req, res, next);
                        } else {
                            return ((req: Request, res: Response, next: NextFunction) => {

                                // TODO: Implement this using error entities
                                res.status(406);
                                res.send('Format not supported');
                            })(req, res, next);
                        }
                    } else {
                        // Return a default handler if given
                        if (currentMethod['default']) {
                            return currentMethod['default'](req, res, next);
                        } else {
                            return ((req: Request, res: Response, next: NextFunction) => {

                                // TODO: Implement this using error entities
                                res.status(406);
                                res.send('Format not supported');
                            })(req, res, next);
                        }
                    }

                    // TODO: Replace this naive implementation of content negotiation - https://github.com/cleishm/express-negotiate may be better used in this case
                    // @ts-ignore
                    //req.negotiate(currentMethod);
                }

            }
        }

        return route;
    }
}