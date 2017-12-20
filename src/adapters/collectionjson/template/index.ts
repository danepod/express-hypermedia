// Dependencies ---------------------------------------------------------------
import { Action as BaseAction } from "../../../Action";
import { Options } from "../../../interfaces";
import { Data } from "../index";
import { Request } from "express";

// Collection+JSON Template implementation ------------------------------------
export abstract class Template extends BaseAction {
    abstract data: Data[];

    constructor(options?: Options) {
        super(options);
    }

    static validatePOST(req: Request) {
        return;
    };

    static validatePUT(req: Request) {
        return;
    };

    static validateDELETE(req: Request) {
        return;
    };

    //@ts-ignore TODO: Add more handlers
    execute(): Options {
        if (this.options.method === "POST") {
            return this.executePOST();
        } else if (this.options.method === "PUT") {
            return this.executePUT();
        } else if (this.options.method === "DELETE") {
            return this.executeDELETE();
        }
    }

    executePOST(): Options {
        throw new Error("Method not implemented");
    };

    executePUT(): Options {
        throw new Error("Method not implemented");
    };

    executeDELETE(): Options {
        throw new Error("Method not implemented");
    };

    toJSON(): Object {
        return {
            data: this.data
        }
    }
}