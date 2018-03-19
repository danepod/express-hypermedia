// Dependencies ---------------------------------------------------------------
import { Router } from "express";

import { ResourceIdentifier } from "./ResourceIdentifier";

// Resource Implementation ----------------------------------------------------
/**
 * The Resource class is used to describe a Resource as it is defined in [Roy Fieldings Thesis](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_2_1_1).
 *
 * Use a Resource to describe a certain thing or entity, for example ['Movies'](https://github.com/danepod/movie-database/blob/master/src/routes/movies.ts). You can assign a base url to a Resource and then add ResourceIdentifiers, which describe mappings to entities of a Resource (e.g. a list of movies or one movie in particular).
 */
export class Resource {
    /**
     * A canonical identifier for a Resource, e.g. `movie`
     */
    name: string;

    /**
     * A canonical base URL for a Resource, e.g. `/movies`
     */
    url: string; // TODO: Introduce URL type to enforce valid (relative) URLs

    /**
     * Array containing all ResourceIdentifiers of a Resource
     */
    resourceIdentifiers: ResourceIdentifier[] = [];

    /**
     * Create a new Resource
     * @param name Canonical identifier of the Resource
     * @param url Canonical base URL of the Resource. If omitted, the URL will be set to `/name+s`
     */
    constructor(name: string, url?: string) {
        url = url || `/${name}s`;

        if (!url.startsWith("/")) {
            url = `/${url}`;
        }

        this.name = name;
        this.url = url;
    }

    /**
     * Add ResourceIdentifiers to the Resource
     * @param resourceIdentifiers ResourceIdentifiers to be added to the Resource. Can be a single ResourceIdentifier or an array of ResourceIdentifiers
     */
    addIdentifiers(resourceIdentifiers: ResourceIdentifier | ResourceIdentifier[]) {
        const addedIdentifiers: ResourceIdentifier[] = Array.isArray(resourceIdentifiers) ? resourceIdentifiers : [resourceIdentifiers];

        this.resourceIdentifiers.push(...addedIdentifiers);
    }

    /**
     * Generate an express Router from this Resource
     */
    getExpressRouter(): Router {
        const router = Router();

        for (const identifier of this.resourceIdentifiers) {
            const url = identifier.url;
            const handlers = identifier.getRoute();

            for (const method in handlers) {
                if (handlers.hasOwnProperty(method)) {
                    const handler = handlers[method];

                    switch (method.toUpperCase()) {
                        case "GET":
                            router.get(`${this.url}${url}`, handler);
                            break;
                        case "POST":
                            router.post(`${this.url}${url}`, handler);
                            break;
                        case "PUT":
                            router.put(`${this.url}${url}`, handler);
                            break;
                        case "PATCH":
                            router.patch(`${this.url}${url}`, handler);
                            break;
                        case "DELETE":
                            router.delete(`${this.url}${url}`, handler);
                            break;
                    }
                }
            }
        }

        return router;
    }
}
