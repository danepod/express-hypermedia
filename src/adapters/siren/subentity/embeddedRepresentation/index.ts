import { Entity } from "../../entity";
import { Provider } from "../../Provider";

/**
 * A type of Entity that can be embedded as a Sub-Entity inside another Entity
 */
export class EmbeddedRepresentation extends Entity {
    /**
     * Defines the relationship of the sub-entity to its parent, per Web
     * Linking (RFC5899).
     */
    rel: string[];

    /**
     * Embedded sub-entity representations retain all the characteristics of a standard entity, but MUST also contain a rel attribute describing the relationship of the sub-entity to its parent.
     * @param provider The provider containing the methods to fill in the Entity's properties
     * @param rels Description of the relation between Sub-Entity and its parent Entity
     * @param options Object containing all data the Provider needs to fill in the Entity's properties
     */
    constructor(provider: Provider, rels: string | string[], options: object) {
        super(provider, options);

        this.rel = Array.isArray(rels) ? rels : [rels];
    }
}
