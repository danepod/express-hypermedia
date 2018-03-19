// Dependencies ---------------------------------------------------------------
import { Request } from "express";

import { Action as BaseAction } from "../../../Action";
import { Data } from "../index";

// Collection+JSON Template implementation ------------------------------------
/**
 * Templates represent instructions on how to construct POST/PUT/PATCH/DELETE requests.
 *
 * This is the Collection+JSON Template base class. This abstract class defines the properties and methods each Collection+JSON Template can implement. An actual Collection+JSON Template does not need to implement every property as some may be intentionally left blank. Abstract methods and properties must be implemented though. Extend on this class to create actual Collection+JSON Templates, implement every method and property that is abstract in this class as well as the remaining parts ypu may need.
 *
 * See [Movie Template](https://github.com/danepod/movie-database/blob/master/src/resources/movie/list/collectionjson/actions.ts#L7) for a concrete example of this.
 */
export abstract class Template extends BaseAction {
    /**
     * Validate a given request to ensure it contains all needed data to successfully executePOST() a Template. This is a stub that is used if you don't want to validate the input.
     *
     * Handle this static method as if it were abstract as well. You may redefine it in a concrete Template implementation. If any validation error may occur, throw a RequestError within this method.
     * @param req Express Request object
     */
    static validatePOST(req: Request) {
        return;
    }

    /**
     * Validate a given request to ensure it contains all needed data to successfully executePUT() a Template. This is a stub that is used if you don't want to validate the input.
     *
     * Handle this static method as if it were abstract as well. You may redefine it in a concrete Template implementation. If any validation error may occur, throw a RequestError within this method.
     * @param req Express Request object
     */
    static validatePUT(req: Request) {
        return;
    }

    /**
     * Validate a given request to ensure it contains all needed data to successfully executeDELETE() a Template. This is a stub that is used if you don't want to validate the input.
     *
     * Handle this static method as if it were abstract as well. You may redefine it in a concrete Template implementation. If any validation error may occur, throw a RequestError within this method.
     * @param req Express Request object
     */
    static validateDELETE(req: Request) {
        return;
    }

    /**
     * An array of Data objects, representing the template of key-value pairs a client needs to construct a request triggering the action tied to this Template.
     */
    abstract data: Data[];

    /**
     * This method is usually implemented in classes that extend on Action. Due to the nature of Collection+JSON Templates to be defined for multiple HTTP methods instead of one, this method must not be used with Collection+JSON Templates. Implement and use executePOST(), executePUT(), executePATCH(), or executeDELETE() instead.
     */
    execute(): never {
        throw new Error("Use executePOST(), executePUT(), or executeDELETE() instead of execute() for Collection+JSON templates!");
    }

    /**
     * Use this method to implement calls to business logic needed to handle POST requests.
     *
     * @returns An object containing all data that is needed for the request handler to finish the request. Example of data to be returned here may be the id of a newly generated database record for a redirection.
     */
    executePOST(): object {
        throw new Error("Method not implemented");
    }

    /**
     * Use this method to implement calls to business logic needed to handle PUT requests.
     *
     * @returns An object containing all data that is needed for the request handler to finish the request. Example of data to be returned here may be the id of a newly generated database record for a redirection.
     */
    executePUT(): object {
        throw new Error("Method not implemented");
    }

    /**
     * Use this method to implement calls to business logic needed to handle PATCH requests.
     *
     * @returns An object containing all data that is needed for the request handler to finish the request. Example of data to be returned here may be data to create a status message.
     */
    executePATCH(): object {
        throw new Error("Method not implemented");
    }

    /**
     * Use this method to implement calls to business logic needed to handle DELETE requests.
     *
     * @returns An object containing all data that is needed for the request handler to finish the request. Example of data to be returned here may be the id of a deleted generated database record to construct a status message.
     */
    executeDELETE(): object {
        throw new Error("Method not implemented");
    }

    /**
     * Defines how a Collection+JSON Template will be serialized into JSON. We don't want all properties to be sent with the response, so this filters some details.
     */
    toJSON(): object {
        return {
            data: this.data
        };
    }
}
