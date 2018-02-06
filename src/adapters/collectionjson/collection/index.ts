import { Provider } from "../Provider";
import { Entity } from '../../../Entity';
import { Link, Item, Query, Error as CJError, Template } from '../index';

/**
 * A Collection is an URI-addressable resource that contains items and navigational information. It may contain templates and query information to inform the client of available interactions.
 */
export class Collection extends Entity {
    /**
     * Describes which version of the Collection+JSON spec ist used for the response.
     */
    version?: number;

    /**
     * URL to the collection.
     * 
     * Please note that, if you want to display a `self`-link to a single element of a collection, you'll need to use the `links` property instead. This href is supposed to display the URL of the collection containing the element. See the [Github Issue](https://github.com/collection-json/spec/issues/9) for more information on this.
     */
    href?: string;

    /**
     * Additional Links
     */
    links?: Link[];

    /**
     * Items of the collection. This represents the list of records of a collection.
     */
    items?: Item[];

    /**
     * Queries of the collection. These represent available query parameters for GET requests.
     */
    queries?: Query[];

    /**
     * Templates of the collection. These show how to construct POST/PUT/PATCH/DELETE requests.
     */
    template?: Template;

    /**
     * Information on errors while handling the request.
     */
    error?: CJError;

    /**
     * A Collection is an URI-addressable resource that contains items and navigational information. It may contain templates and query information to inform the client of available interactions.
     * @param provider The provider containing the methods to fill in the Collection's properties
     * @param options Object containing all data the Provider needs to fill in the Collection's properties
     */
    constructor(provider: Provider, options?: Object) {
        super();

        this.version = provider.getVersion(options);
        this.href = provider.getHref(options);
        this.links = provider.getLinks(options);
        this.items = provider.getItems(options);
        this.queries = provider.getQueries(options);
        this.template = provider.getTemplate(options);
        this.error = provider.getError(options);
    }

    /**
     * Defines, how a Collection will be serialized into JSON.
     * 
     * The Collection+JSON spec expects the response to contain one single named object called `collection` on the top level. This satisfies that requirement.
     */
    toJSON(): any {
        return {
            collection: {
                version: this.version,
                href: this.href,
                links: this.links,
                items: this.items,
                queries: this.queries,
                template: this.template,
                error: this.error
            }
        }
    }
}