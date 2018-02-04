// Dependencies ---------------------------------------------------------------
import { Request } from "express";

// Action class declaration ---------------------------------------------------
/**
 * Action classes are used to describe mutations for Resources.
 * 
 * This is the Action base class. This abstract class defines the minimal properties and methods an Action should have. Extend on this class to create Action classes for every hypermedia format adapter. For examples, see Siren.Action or
 * CJ.Query and CJ.Template.
 * 
 * The library user must then subclass the Actions of each format adapter they wish to use for every combination of
 * format and ResourceIdentifier. See [Movie List Actions (Siren)](https://github.com/danepod/movie-database/blob/master/src/resources/movie/list/siren/actions.ts) and [Movie List Actions (CJ)](https://github.com/danepod/movie-database/blob/master/src/resources/movie/list/collectionjson/actions.ts) for concrete examples of this.
 */
export abstract class Action {
    /**
     * The options object is used to 
     * 
     * 1. generate the serializable Action that an HTTP client receives as part of a response. It needs all data to create a displayable representation of an Action (for example an ID as part of the Action URI).
     * 2. store all data used for the execution of an action when an HTTP client requests the action to be executed (for example: Name of a database record to be created)
     * 
     * Use this options object to define, which properties are needed to create both of these cases. For an action that needs the ID to generate a displayable Action and a name to be able to execute(), this should be redefined as:
     * 
     * `options: { id: number, name: string }`
     */
    abstract options: Object;
    
    /**
     * Actions show available behaviors an entity exposes.
     * 
     * @param options: See options property. This options parameter must be defined in a way that it takes at least all data to be able to create a displayable representation of an action. So for the example stated for the options property of this class, only `id` is needed for that. The options used as the constructor parameter should then be defined as follows: `constructor(options: { id: number, name?: string }) { ...`
     */
    constructor(options?: Object) {
        this.options = options || {};
    }

    /**
     * Validate a given request to ensure it contains all needed data to successfully execute() an Action. This is a stub that is used if you don't want to validate the input.
     * 
     * Handle this static method as if it were abstract as well. You may redefine it in a concrete Action implementation. If any validation error may occur, throw a RequestError within this method.
     * @param req Express Request object
     */
    static validate(req: Request) {
        return;
    };
    
    /**
     * Use this method to implement or call business logic needed for the
     * action.
     * 
     * @returns An object containing all data that is needed for the request handler to finish the request. Example of data to be returned here may be the id of a newly generated database record for a redirection.
     */
    abstract execute(): Object | undefined;

}