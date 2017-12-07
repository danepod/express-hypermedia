// Dependencies ---------------------------------------------------------------
import { Action as BaseAction } from "../../../Action";
import { Options } from "../../../interfaces";
import { Data } from "../index";

// Collection+JSON Template implementation ------------------------------------
export abstract class Template extends BaseAction {
    abstract data: Data[];

    constructor(options?: Options) {
        super(options);
    }

    //@ts-ignore TODO: Add more handlers
    execute(): Options {
        if (this.options.method === "post") {
            return this.executePOST();
        } else if (this.options.method === "put") {
            return this.executePUT();
        } else if (this.options.method === "delete") {
            return this.executeDELETE();
        }
    }

    abstract executePOST(): Options;

    abstract executePUT(): Options;

    abstract executeDELETE(): Options;

    toJSON(): Object {
        return {
            data: this.data
        }
    }
}