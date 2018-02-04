// Dependencies ---------------------------------------------------------------
import { Action as BaseAction } from "../../../Action";
import { Data } from "../index";
import { Request } from "express";

// Collection+JSON Template implementation ------------------------------------
export abstract class Template extends BaseAction {
    abstract data: Data[];
    abstract options: Object;

    constructor(options?: Object) {
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

    execute(): never {
        throw new Error("Use executePOST(), executePUT(), or executeDELETE() instead of execute() for Collection+JSON templates!");
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