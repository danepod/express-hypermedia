import { Provider } from "../Provider";
import { Entity } from '../../../Entity';
import { Options } from '../../../interfaces';
import { Link, Item, Query, Error, Interfaces } from '../index';

export class Collection extends Entity {
    version?: number;

    href?: string;

    links?: Link[];

    items?: Item[];

    queries?: Query[];

    template?: Interfaces.Template;

    error?: Error;

    constructor(provider: Provider, options?: Options) {
        super();

        this.version = provider.getVersion(options);
        this.href = provider.getHref(options);
        this.links = provider.getLinks(options);
        this.items = provider.getItems(options);
        this.queries = provider.getQueries(options);
        this.template = provider.getTemplate(options);
        this.error = provider.getError(options);
    }
}