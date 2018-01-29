// Dependencies ---------------------------------------------------------------
import { Router } from "express";

import { ResourceIdentifier } from "./ResourceIdentifier";

// Resource Implementation ----------------------------------------------------
export class Resource {
    name: string;
    url: string; // TODO: Introduce URL type to enforce valid (relative) URLs
    resourceIdentifiers: ResourceIdentifier[] = [];

    constructor(name: string, url?: string) {
        url = url || `/${name}s`;

        if(!url.startsWith("/")){
            url = `/${url}`;
        }

        this.name = name;
        this.url = url;
    }

    addIdentifiers(resourceIdentifiers: ResourceIdentifier | ResourceIdentifier[]) {
        const addedIdentifiers: ResourceIdentifier[] = Array.isArray(resourceIdentifiers) ? resourceIdentifiers : [resourceIdentifiers];

        this.resourceIdentifiers.push(...addedIdentifiers);
    }

    getExpressRouter(): Router {
        const router = Router();

        for (const identifier of this.resourceIdentifiers) {
            const url = identifier.url,
                  handlers = identifier.getRoute();

            for (let method in handlers) {
                let handler = handlers[method];

                // TODO: Add more HTTP verbs
                switch (method.toUpperCase()) {
                    case 'GET':
                        router.get(`${this.url}${url}`, handler);
                        break;
                    case 'POST':
                        router.post(`${this.url}${url}`, handler);
                        break;
                    case 'PUT':
                        router.put(`${this.url}${url}`, handler);
                        break;
                    case 'PATCH':
                        router.patch(`${this.url}${url}`, handler);
                        break;
                    case 'DELETE':
                        router.delete(`${this.url}${url}`, handler);
                        break;
                }
            }
        }

        return router;
    }
}