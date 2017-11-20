import { Entity } from '../../entity';
import { Provider } from '../../Provider';

export class EmbeddedRepresentation extends Entity {
    /** 
     * Defines the relationship of the sub-entity to its parent, per Web 
     * Linking (RFC5899).
     */
    rel: string[];

    constructor(provider: Provider, rels: string | string[]) {
        super(provider);

        this.rel = Array.isArray(rels) ? rels : [rels];
    }
}