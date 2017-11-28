// Dependencies ---------------------------------------------------------------
import { Provider } from "./Provider";
import { Route, CNMapping } from "./interfaces";
import { Request, Response, NextFunction } from "express";

// Representation implementation ----------------------------------------------
export class Representation {
    keywords: string[] = [];
    url: string;
    providers: Provider[] = [];

    constructor(url: string) {
        this.url = url;
    }

    getRoute(): Route {
        const route: Route = {};
        const cnMapping: CNMapping = {};

        // Collect handlers of each provider
        for (let provider of this.providers) {
            cnMapping[provider.contentType] = provider.handler;
        }

        // TODO: Move this into a route class, as this behaviour should be deafult for every GET request
        // TODO: Replace this naive implementation of content negotiation - https://github.com/cleishm/express-negotiate may be better used in this case
        // Create new handler that does content negotiation
        route.get = (req: Request, res: Response, next: NextFunction) => {
            const accepts = req.header('Accept');

            if(accepts !== undefined && accepts !== '*/*') {
                if(cnMapping[accepts] !== undefined) {
                    return cnMapping[accepts](req, res, next);
                } else {
                    return ((req: Request, res: Response, next: NextFunction) => {

                        // TODO: Implement this using error entities
                        res.status(406);
                        res.send('Format not supported');
                    })(req, res, next);
                }
            } else {
                // Just return the first handler
                // TODO: Implement a setting to set another default handler

                return this.providers[0].handler(req, res, next);
            }
        }

        // TODO: Iterate each Action for POST, PATCH, DELETE, etc. handlers


        return route;
    }
}