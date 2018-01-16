// Dependencies ---------------------------------------------------------------
import { Router } from "express";

import { Representation } from "./Representation";

// Resource Implementation ----------------------------------------------------
export class Resource {
    name: string;
    url: string; // TODO: Introduce URL type to enforce valid (relative) URLs
    representations: Representation[] = [];

    constructor(name: string, url?: string) {
        url = url || `/${name}s`;

        if(!url.startsWith("/")){
            url = `/${url}`;
        }

        this.name = name;
        this.url = url;
    }

    addRepresentations(representations: Representation | Representation[]) {
        const currentRepresentations: Representation[] = Array.isArray(representations) ? representations : [representations];

        this.representations.push(...currentRepresentations);
    }

    getExpressRouter(): Router {
        const router = Router();

        for (const representation of this.representations) {
            const url = representation.url,
                  handlers = representation.getRoute();

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