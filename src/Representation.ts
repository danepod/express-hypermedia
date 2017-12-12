// Dependencies ---------------------------------------------------------------
import { Route, HandlerMap } from "./interfaces";
import { Request, Response, NextFunction, Handler } from "express";
import { RequestError } from "./error";
import { Entity } from "./Entity";

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

    addHandlers(format: string, handlers: {[method: string]: Handler | Entity}, fallback: boolean = false) {
        for (const method in handlers) {
            const methodHandler = handlers[method];
            let handlerFunction: Handler;

            if (methodHandler instanceof Entity) {
                handlerFunction = (req: Request, res: Response, next: NextFunction) => {
                    res.json(methodHandler);
                }
            } else {
                handlerFunction = methodHandler;
            }

            this.handlers[method] = this.handlers[method] || {};
            this.handlers[method][format] = handlerFunction;

            if (fallback) {
                this.handlers[method]["default"] = handlerFunction;
            }
        }
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
                            throw new RequestError('Format not supported', 406);
                        }
                    } else {
                        // Return a default handler if given
                        if (currentMethod['default']) {
                            return currentMethod['default'](req, res, next);
                        } else {
                            throw new RequestError('Format not supported', 406);
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