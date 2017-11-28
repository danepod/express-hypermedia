// Dependencies ---------------------------------------------------------------
import { Representation } from "./Representation";
import { RouteMap } from "./interfaces";

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

    getRoutes(): RouteMap {
        const routes: RouteMap = {};
        
        // TODO: For every Representation, get URL with its handlers and merge it into a RouteMap
        for (let representation of this.representations) {
            routes[representation.url] = representation.getRoute();
        }

        return routes;
    }
}