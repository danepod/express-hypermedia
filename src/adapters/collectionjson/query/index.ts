import { Data } from "../data";

export class Query {
    href: string;

    rel: string;

    name?: string;

    prompt?: string;

    data?: Data[];
}