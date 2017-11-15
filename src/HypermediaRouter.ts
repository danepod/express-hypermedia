// Dependencies ---------------------------------------------------------------
import { Router } from "express";

import { Resource } from "./Resource";

// Hypermedia Router implementation -------------------------------------------
export class HypermediaRouter {
    resources: Resource[] = [];

    resource(resource: Resource) {
        this.resources.push(resource);
    }

    getExpressRouter(): Router {
        const router = Router();

        // Unwrap RouteTree of every Resource and add it to the Router
        for (let resource of this.resources) {
            let routes = resource.getRoutes();

            for (let url in routes) {
                let currentUrl = routes[url];

                for (let method in currentUrl) {
                    let handler = currentUrl[method];

                    switch (method) {
                        case 'get':
                            router.get(`${resource.url}${url}`, handler);
                            break;
                        // TODO: Add more HTTP verbs
                        default:
                            break;
                    }
                }
            }
        }

        return router;
    }
}