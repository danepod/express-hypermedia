export class EmbeddedLink {
    /**
     * Describes the nature of an entity's content based on the current 
     * representation. Possible values are implementation-dependent and should 
     * be documented.
     */
    class?: string[];

    /**
     * Defines the relationship of the sub-entity to its parent, per Web 
     * Linking (RFC5899).
     */
    rel: string[];

    /** The URI of the linked sub-entity. */
    href: string;

    /**
     * Defines media type of the linked resource, per Web Linking (RFC5988). 
     * For the syntax, see RFC2045 (section 5.1), RFC4288 (section 4.2), 
     * RFC6838 (section 4.2)
     */
    type?: string;

    /** Descriptive text about the entity. */
    title?: string;

    constructor(
        rels: string | string[],
        href: string
    ) {
        if (rels) {
            this.rel = Array.isArray(rels) ? rels : [rels];
        }

        this.href = href;
        this.title = undefined;
        this.type = undefined;
    }
}