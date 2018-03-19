// Dependencies ---------------------------------------------------------------
import { Render } from "../interfaces";

// Link implementation --------------------------------------------------------
/**
 * Object representing Links to other URI addressable resources
 */
export class Link {
    /**
     * URI of the linked resource
     */
    href: string;

    /**
     * Relation to the linked resource
     */
    rel: string;

    /**
     * Name of the linked resource
     */
    name?: string;

    /**
     * Instructions for the client on how to handle the link. Must be either "link" or "image".
     */
    render?: Render;

    /**
     * The human-readable prompt which may be displayed to the end user by a client
     */
    prompt?: string;

    /**
     * Object representing Links to other URI addressable resources
     * @param href URI of the linked resource
     * @param rel Relation to the linked resource
     */
    constructor(href: string, rel: string) {
        this.href = href;
        this.rel = rel;
    }
}
