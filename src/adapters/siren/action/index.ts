// import { Request, Response } from 'express';
import { Method } from "../../../interfaces";
import { Field } from "../interfaces";

export class Action {
    /**
     * A string that identifies the action to be performed. Action names MUST 
     * be unique within the set of actions for an entity. The behaviour of 
     * clients when parsing a Siren document that violates this constraint is 
     * undefined.
     */
    name: string;

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
    method: Method;

    /** The URI of the action. */
    href: string;

    /** Descriptive text about the action. */
    title?: string;

    /**
     * The encoding type for the request. When omitted and the fields attribute
     *  exists, the default value is `application/x-www-form-urlencoded`.
     */
    type?: string;

    /** A collection of fields. */
    fields?: Field[];

    // TODO: Implement handlers and register actions with their entities
    //handler: (req: Request, res: Response) => void;

    /**
     * Actions show available behaviors an entity exposes.
     * 
     * @param name A string that identifies the action to be performed. Action names MUST 
     * be unique within the set of actions for an entity. The behaviour of 
     * clients when parsing a Siren document that violates this constraint is 
     * undefined.
     * @param href The URI of the action.
     */
    constructor(
        name: string,
        href: string
    ) {
        this.name = name;
        this.href = href;
    }
}

