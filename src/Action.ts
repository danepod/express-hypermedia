// Dependencies ---------------------------------------------------------------
import { Options } from "./interfaces";
import { Request } from "express";

// Action class declaration ---------------------------------------------------
export abstract class Action {
    options: Options;
    
    /**
     * Actions show available behaviors an entity exposes.
     */
    constructor(options?: Options) {
        this.options = options || {};
    }

    static validate(req: Request) {
        return;
    };
    
    /**
     * Use this method to implement or call business logic needed for the
     * action.
     */
    abstract execute(): Options | undefined;

}