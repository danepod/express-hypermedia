import { EmbeddedLink, EmbeddedRepresentation } from '../subentity';
import { Action } from '../action';
import { Link } from '../link';
import { Provider } from '../Provider';
import { Entity as BaseEntity } from "../../../Entity";

export class Entity extends BaseEntity {
    /** 
     * Describes the nature of an entity's content based on the current 
     * representation. Possible values are implementation-dependent and should 
     * be documented. 
     */
    class?: string[];

    /** Descriptive text about the entity. */
    title?: string;

    /** A set of key-value pairs that describe the state of an entity. */
    properties?: object;

    /** 
     * A collection of related sub-entities. If a sub-entity contains an href 
     * value, it should be treated as an embedded link. Clients may choose to 
     * optimistically load embedded links. If no href value exists, the 
     * sub-entity is an embedded entity representation that contains all the 
     * characteristics of a typical entity. One difference is that a sub-entity
     *  MUST contain a rel attribute to describe its relationship to the parent
     *  entity.
     */
    entities?: (EmbeddedLink | EmbeddedRepresentation)[];

    /**
     * A collection of actions; actions show available behaviors an entity 
     * exposes.
     */
    actions?: Action[];

    /**
     * A collection of items that describe navigational links, distinct from 
     * entity relationships. Link items should contain a `rel` attribute to 
     * describe the relationship and an `href` attribute to point to the target
     *  URI. Entities should include a link `rel` to `self`.
     */
    links?: Link[];

    constructor(provider: Provider, options?: Object) {
        super();

        this.class = provider.getClass(options);
        this.title = provider.getTitle(options);
        this.properties = provider.getProperties(options);
        this.entities = provider.getEntities(options);
        this.actions = provider.getActions(options);
        this.links = provider.getLinks(options);
    }
}