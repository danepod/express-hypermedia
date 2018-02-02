// Dependencies ---------------------------------------------------------------
import { Action as BaseAction } from '../../../Action';
import { Method } from "../../../interfaces";
import { Field } from "../interfaces";

// Siren Action implementation ------------------------------------------------
export abstract class Action extends BaseAction {
    /**
     * A string that identifies the action to be performed. Action names MUST 
     * be unique within the set of actions for an entity. The behaviour of 
     * clients when parsing a Siren document that violates this constraint is 
     * undefined.
     */
    abstract name: string;

    /**
     * Describes the nature of an action based on the current representation. 
     * Possible values are implementation-dependent and should be documented.
     */
    class?: string[];

    /**
     * An enumerated attribute mapping to a protocol method. For HTTP, these 
     * values may be GET, PUT, POST, DELETE, or PATCH. As new methods are 
     * introduced, this list can be extended. If this attribute is omitted, 
     * GET should be assumed.
     */
    abstract method: Method;

    /** The URI of the action. */
    abstract href: string;

    /** Descriptive text about the action. */
    title?: string;

    /**
     * The encoding type for the request. When omitted and the fields attribute
     *  exists, the default value is `application/x-www-form-urlencoded`.
     */
    type?: string;

    /** A collection of fields. */
    fields?: Field[];
    
    /**
     * Actions show available behaviors an entity exposes.
     * 
     * @param options: See options property of the base Action class. This options parameter must be defined in a way that it takes at least all data to be able to create a displayable representation of an action. So for the example stated for the options property of this class, only `id` is needed for that. The options used as the constructor parameter should then be defined as follows: `constructor(options: { id: number, name?: string }) { ...`
     */
    constructor(options?: Object) {
        super(options);
    }

    toJSON(): Object {
        return {
            name: this.name,
            class: this.class,
            method: this.method,
            href: this.href,
            title: this.title,
            type: this.type,
            fields: this.fields
        }
    }
}

