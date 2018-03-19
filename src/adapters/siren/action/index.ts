// Dependencies ---------------------------------------------------------------
import { Action as BaseAction } from "../../../Action";
import { Method } from "../../../interfaces";
import { IField } from "../interfaces";

// Siren Action implementation ------------------------------------------------
/**
 * Actions show available behaviors an entity exposes.
 *
 * This is the Siren Action base class. This abstract class defines the properties and methods each Siren Action can implement. An actual Siren Action does not need to implement every property as some of the properties may be intentionally left blank. Abstract methods and properties must be implemented though. Extend on this class to create actual Siren Actions, implement every method and property that is abstract in this class as well as the remaining parts you may need.
 *
 * See [Movie List Actions (Siren)](https://github.com/danepod/movie-database/blob/master/src/resources/movie/list/siren/actions.ts) and [Movie Detail Actions (Siren)](https://github.com/danepod/movie-database/blob/master/src/resources/movie/detail/siren/actions.ts) for concrete examples of this.
 */
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
    fields?: IField[];

    /**
     * Actions show available behaviors an entity exposes.
     *
     * @param options: See options property of the base Action class. This options parameter must be defined in a way that it takes at least all data to be able to create a displayable representation of an action. So for the example stated for the options property of this class, only `id` is needed for that. The options used as the constructor parameter should then be defined as follows: `constructor(options: { id: number, name?: string }) { ...`
     */
    constructor(options?: object) {
        super(options);
    }

    /**
     * Defines how a Siren Action will be serialized into JSON. We don't want all properties to be sent with the response, so this filters some internals.
     */
    toJSON(): object {
        return {
            name: this.name,
            class: this.class,
            method: this.method,
            href: this.href,
            title: this.title,
            type: this.type,
            fields: this.fields
        };
    }
}
