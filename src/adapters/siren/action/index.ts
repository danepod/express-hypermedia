// Dependencies ---------------------------------------------------------------
import { Action as BaseAction } from '../../../Action';
import { Method, Options } from "../../../interfaces";
import { Field } from "../interfaces";
import { Request } from "express";

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
     */
    constructor(options?: Options) {
        super(options);
    }

    static validate(req: Request) {
        return;
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

