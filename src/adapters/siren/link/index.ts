/**
 * Links represent navigational transitions.
 */
export class Link {
    /** 
     * Defines the relationship of the link to its entity, per Web Linking 
     * (RFC5988).
     */
    rel: string[];

    /** The URI of the linked resource. */
    href: string;

    /** Text describing the nature of a link. */
    title?: string;

    /**
     * Describes aspects of the link based on the current representation. 
     * Possible values are implementation-dependent and should be documented.
     */
    class?: string[];

    /**
     * Defines media type of the linked resource, per Web Linking (RFC5988). 
     * For the syntax, see RFC2045 (section 5.1), RFC4288 (section 4.2), 
     * RFC6838 (section 4.2)
     */
    type?: string;

    /**
     * Links represent navigational transitions.
     * 
     * @param rel Set the relation property of the resulting Link object
     * @param href Set the href property of the resulting Link object
     */
    constructor (
        rel: string | string[],
        href: string
    ) {
        this.rel = Array.isArray(rel) ? rel : [rel];
        this.href = href;
    }
}
