// Dependencies ---------------------------------------------------------------
import { Representation } from "./Representation";
import { RouteTree } from "./interfaces";

// Resource Implementation ----------------------------------------------------
export class Resource {
    name: string;
    url: string; // TODO: Introduce URL type to enforce valid (relative) URLs
    representations: Representation[] = [];

    constructor(name: string, url?: string) {
        this.name = name;
        this.url = url || `/${name}s`
    }

    representation(representation: Representation) {
        this.representations.push(representation);
    }

    getRoutes(): RouteTree {
        const routes: RouteTree = {};
        
        // TODO: For every Representation, get URL with its handlers and merge it into a RouteTree
        for (let representation of this.representations) {
            routes[representation.url] = representation.getRoute();
        }

        return routes;
    }
}