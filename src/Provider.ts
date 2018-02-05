// Dependencies ---------------------------------------------------------------
import { Entity } from "./Entity";

// Provider class declaration -------------------------------------------------
/**
 * Provider classes are used to fill the gap between business logic and responses as defined through Entities. They are used to fill in the properties of an Entity class by providing methods calling business logic and formatting the output to be valid for the used format.
 * 
 * This is the Provider base class. This abstract class defines the minimal properties and methods a Provider should have. Extend on this class to create Provider classes for each hypermedia format adapter. For examples, see Siren.Provider or CJ.Provider.
 * 
 * The library user must then subclass the Provider of each format adpater they wish to use for every combination of format and ResourceIdentifier. See [Movie List Provider (Siren)](https://github.com/danepod/movie-database/blob/master/src/resources/movie/list/siren/provider.ts) and [Movie List Provider (CJ)](https://github.com/danepod/movie-database/blob/master/src/resources/movie/list/collectionjson/provider.ts) for concrete examples of this.
 */
export abstract class Provider {
    /**
     * The Entity that is used by the Provider. An Entity contains the properties that get serialized into a response. Use this to further restrict the type of Entity when subclassing this Provider. For example, the Siren Provider class redefines this to be of the type `Siren.Entity`.
     */
    abstract entity: Entity;

    /**
     * Defines the general behavior how a Provider shall be serialized into JSON. We never want to serialize the Provider itself, instead the Entity instance of a Provider shall be serialized.
     * 
     * @returns An Entity object, that will get serialized into JSON
     */
    toJSON(): Entity {
        return this.entity.toJSON();
    }
}