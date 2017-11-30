// Dependencies ---------------------------------------------------------------
import { Options } from "./interfaces";

// Action class declaration ---------------------------------------------------
export abstract class Action {
    options?: Options;
    
    /**
     * Actions show available behaviors an entity exposes.
     */
    constructor(options?: Options) {
        this.options = options;
    }
    
    /**
     * Use this method to implement or call business logic needed for the
     * action.
     */
    abstract execute(): Options | undefined;
}