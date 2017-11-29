import { Entity } from '../../entity';
import { Provider } from '../../Provider';
import { Options } from '../../../../interfaces';

export class EmbeddedRepresentation extends Entity {
    /** 
     * Defines the relationship of the sub-entity to its parent, per Web 
     * Linking (RFC5899).
     */
    rel: string[];

    constructor(provider: Provider, rels: string | string[], options: Options) {
        super(provider, options);

        this.rel = Array.isArray(rels) ? rels : [rels];
    }
}