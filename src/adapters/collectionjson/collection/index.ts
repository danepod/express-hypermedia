import { Link } from '../link';
import { Item } from "../item";
import { Query } from "../query";
import { Data } from "../data";
import { Error } from "../error";

import { Provider } from "../Provider";

export class Collection {
    version?: number = 1.0;

    href?: string;

    links?: Link[];

    items?: Item[];

    queries?: Query[];

    template?: { data: Data[] };

    error?: Error;

    constructor(provider: Provider) {
        
    }
}