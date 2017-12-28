// Dependencies ---------------------------------------------------------------
import { Action as BaseAction } from "../../../Action";
import { Data } from "../data";

// Collection+JSON Query implementation ---------------------------------------
export abstract class Query extends BaseAction {
    abstract href: string;

    abstract rel: string;

    name?: string;

    prompt?: string;

    data?: Data[];

    toJSON() {
        return {
            href: this.href,
            rel: this.rel,
            name: this.name,
            prompt: this.prompt,
            data: this.data
        }
    }
}