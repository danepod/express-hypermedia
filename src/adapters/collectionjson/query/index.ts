// Dependencies ---------------------------------------------------------------
import { Action as BaseAction } from "../../../Action";
import { Data } from "../data";

// Collection+JSON Query implementation ---------------------------------------
/**
 * Queries represent available query parameters to help clients construct GET requests.
 *
 * This is the Collection+JSON Query base class. This abstract class defines the properties and methods each Collection+JSON Query can implement. An actual Collection+JSON Query does not need to implement every property as some may be intentionally left blank. Abstract methods and properties must be implemented though. Extend on this class to create actual Collection+JSON Queries, implement every method and property that is abstract in this class as well as the remaining parts you may need.
 *
 * See [Movie Search Query](https://github.com/danepod/movie-database/blob/master/src/resources/movie/list/collectionjson/actions.ts) for a concrete example of this.
 */
export abstract class Query extends BaseAction {
    /**
     * The URI of the Query
     */
    abstract href: string;

    /**
     * The relation to the Query
     */
    abstract rel: string;

    /**
     * Descrptive text about the Query.
     */
    name?: string;

    /**
     * A human-readable prompt that the client may display for end-users
     */
    prompt?: string;

    /**
     * An array of Data objects, representing query parameters a client can use
     */
    data?: Data[];

    /**
     * Defines how a Collection+JSON Query will be serialized into JSON. We don't wnat all properties to be sent with the response, so this filters some internals.
     */
    toJSON() {
        return {
            href: this.href,
            rel: this.rel,
            name: this.name,
            prompt: this.prompt,
            data: this.data
        };
    }
}
