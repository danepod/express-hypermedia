// Dependencies ---------------------------------------------------------------
import { Router } from "express";

import { Representation } from "./Representation";

// Resource Implementation ----------------------------------------------------
export class Resource {
    name: string;
    url: string; // TODO: Introduce URL type to enforce valid (relative) URLs
    representations: Representation[] = [];

    constructor(name: string, url?: string) {
        this.name = name;
        this.url = url || `/${name}s`
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

                switch (method) {
                    case 'get':
                        router.get(`${this.url}${url}`, handler);
                        break;
                    case 'post':
                        router.post(`${this.url}${url}`, handler);
                        break;
                    case 'put':
                        router.put(`${this.url}${url}`, handler);
                        break;
                    case 'patch':
                        router.delete(`${this.url}${url}`, handler);
                        break;
                    case 'delete':
                        router.delete(`${this.url}${url}`, handler);
                        break;
                    // TODO: Add more HTTP verbs
                    default:
                        break;
                }
            }
        }

        return router;
    }
}