// Dependencies ---------------------------------------------------------------
import { Request } from "express";

// Action class declaration ---------------------------------------------------
export abstract class Action {
    abstract options: Object;
    
    /**
     * Actions show available behaviors an entity exposes.
     */
    constructor(options?: Object) {
        this.options = options || {};
    }

    static validate(req: Request) {
        return;
    };
    
    /**
     * Use this method to implement or call business logic needed for the
     * action.
     */
    abstract execute(): Object | undefined;

}