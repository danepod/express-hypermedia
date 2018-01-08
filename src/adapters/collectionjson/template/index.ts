// Dependencies ---------------------------------------------------------------
import { Action as BaseAction } from "../../../Action";
import { Data } from "../index";
import { Method } from "../../../interfaces";
import { Request } from "express";

// Collection+JSON Template implementation ------------------------------------
export abstract class Template extends BaseAction {
    abstract data: Data[];
    /* TODO: Find a way to automatically extend upon the parent-class's options
       type. The user of the lib shouldn't be bothered to add the method
       property by hand when subclassing */
    abstract options: {method: Method};

    constructor(options?: {method: Method}) {
        super(options);
    };

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
    execute(): any {
        if (this.options.method === "POST") {
            return this.executePOST();
        } else if (this.options.method === "PUT") {
            return this.executePUT();
        } else if (this.options.method === "DELETE") {
            return this.executeDELETE();
        }
    };

    executePOST(): Object {
        throw new Error("Method not implemented");
    };

    executePUT(): Object {
        throw new Error("Method not implemented");
    };

    executeDELETE(): Object {
        throw new Error("Method not implemented");
    };

    toJSON(): Object {
        return {
            data: this.data
        }
    }
}