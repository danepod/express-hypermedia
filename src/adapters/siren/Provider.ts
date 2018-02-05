// Dependencies ---------------------------------------------------------------
import { Provider as BaseProvider } from "../../Provider";
import * as Siren from './index';

// Siren Provider implementation ----------------------------------------------
/**
 * Provider class used to fill the gap between business logic and Siren Entities. They are used to fill in the properties of a Siren Entity by providing methods that call business logic and format the output to be valid Siren.
 * 
 * This is the Siren Provider base class. This abstract class defines the methods each Siren Provider can implement. An actual Siren Provider does not need to implement every method as some of the properties may be left undefined in a Siren response. Extend on this class to create actual Siren Provider classes and implement each method you need to use.
 * 
 * See [Movie List Provider (Siren)](https://github.com/danepod/movie-database/blob/master/src/resources/movie/list/siren/provider.ts) and [Movie List Provider (CJ)](https://github.com/danepod/movie-database/blob/master/src/resources/movie/list/collectionjson/provider.ts) for concrete examples of this.
 */
export abstract class Provider extends BaseProvider {
    /**
     * The Siren entity that is used by the Provider. An Entity contains the properties that get serialized into a response.
     */
    entity: Siren.Entity;

    /**
     * Creates a Siren Provider object
     * @param options Object used for entity generation, for example to set an
     * id to be fetched. The getter methods of the Provider then use this same
     * object.
     * @param returnEntity Indicates, if an Entity should be generated 
     * immediately. Default is true. May be set to false if you want to use 
     * another kind of Entity, e.g. an EmbeddedRepresentation. You can then
     * use this provider as a parameter to another Entitys constructor.
     */
    constructor(options?: Object, returnEntity: boolean = true) {
        super();

        if(returnEntity) {
            this.entity = new Siren.Entity(this, options);
        }
    }

    /**
     * Describes the nature of an entity's content based on the current 
     * representation.
     * @param options Object containing all data the Provider needs to fill in the class
     */
    getClass(options?: Object): string[] | undefined {
        return undefined;
    }

    /**
     * Descriptive text about the entity.
     * @param options Object containing all data the Provider needs to fill in the title
     */
    getTitle(options?: Object): string | undefined {
        return undefined;
    }

    /**
     * A set of key-value pairs that describe the state of an entity.
     * @param options Object containing all data the Provider needs to fill in the properties
     */
    getProperties(options?: Object): object | undefined {
        return undefined;
    }

    /**
     * A collection of related sub-entities.
     * @param options Object containing all data the Provider needs to fill in the sub-entities
     */
    getEntities(options?: Object): (Siren.EmbeddedLink | Siren.EmbeddedRepresentation)[] | undefined {
        return undefined;
    }
    
    /**
     * A collection of actions; actions show available behaviors an entity exposes.
     * @param options Object containing all data the Provider needs to fill in the actions
     */
    getActions(options?: Object): Siren.Action[] | undefined {
        return undefined;
    }

    /**
     * A collection of items that describe navigational links, distinct from 
     * entity relationships.
     * @param options Object containing all data the Provider needs to fill in the links
     */
    getLinks(options?: Object): Siren.Link[] | undefined {
        return undefined;
    }
}