// Dependencies ---------------------------------------------------------------
import { Provider as BaseProvider } from '../../Provider';
import * as CJ from './index';

// Collection+JSON Provider implementation ------------------------------------
/**
 * Provider class used to fill the gap between business logic and Collection+JSON Collections. They are used to fill in the properties of a Collection by providing methods that call business logic and format the output to be valid Collection+JSON.
 * 
 * This is the Collection+JSON Provider base class. This abstract class defines the methods each Collection+JSON Provider can implement. An actual Collection+JSON Provider does not need to implement every method as some of the properties my be intentionally left undefined in a Collection+JSON response. Extend on this class to create actual Collection+JSON Provider classes and implement every method you need to use.
 * 
 * See [Movie List Provider (CJ)](https://github.com/danepod/movie-database/blob/master/src/resources/movie/list/collectionjson/provider.ts) and [Movie Detail Provider (CJ)](https://github.com/danepod/movie-database/blob/master/src/resources/movie/detail/collectionjson/provider.ts) for concrete examples of this.
 */
export abstract class Provider extends BaseProvider {
    /**
     * The Collection that is used by the Provider. A Collection contains the properties that get serialized into a response.
     */
    entity: CJ.Collection;

    /**
     * Creates a Collection+JSON Provider object
     * @param options Object used for collection generation, for example to set an id to be fetched. The getter methods of the Provider then use this same object.
     * @param returnEntity Indicated, if a Collection (which extends the base Entity, hence the name of this parameter) should be generated immediately. May be set to false if you want to use another kind of Entity (make sure that it is compatible with this Provider). You can then use then use this Prvider as a parameter to another Entity's constructor.
     */
    constructor(options?: Object, returnEntity: boolean = true) {
        super();

        if (returnEntity) {
            this.entity = new CJ.Collection(this, options);
        }
    }

    /**
     * Describes which version of the Collection+JSON spec ist used for the response.
     * @param options Object containing all data the Provider needs to fill in the version
     */
    getVersion(options?: Object): number {
        return 1.0;
    }

    /**
     * Provides a URL to the collection.
     * 
     * Please note that, if you want to display a `self`-link to a single element of a collection, you'll need to use the `links` property instead. This href is supposed to display the URL of the collection containing the element. See the [Github Issue](https://github.com/collection-json/spec/issues/9) for more information on this.
     * @param options Object containing all data the Provider needs to fill in the href
     */
    getHref(options?: Object): string | undefined {
        return undefined;
    }

    /**
     * Provide additional Links
     * @param options Object containing all data the Provider needs to fill in the Links
     */
    getLinks(options?: Object): CJ.Link[] | undefined {
        return undefined;
    }

    /**
     * Provide all Items of the collection. This represents the list of records of a collection.
     * @param options Object containing all data the Provider needs to fill in the Items
     */
    getItems(options?: Object): CJ.Item[] | undefined {
        return undefined;
    }

    /**
     * Provide all Queries of the collection. These represent available query parameters for GET requests.
     * @param options Object containing all data the Provider needs to fill in the Queries
     */
    getQueries(options?: Object): CJ.Query[] | undefined {
        return undefined;
    }

    /**
     * Provide all Templates of the collection. These show how to construct POST/PUT/PATCH requests.
     * @param options Object containing all data the Provider needs to fill in the Templates
     */
    getTemplate(options?: Object): CJ.Template | undefined {
        return undefined;
    }

    /**
     * Provide information on errors while handling the request.
     * @param options Object containing all data the Provider needs to fill in the Error
     */
    getError(options?: Object): CJ.Error | undefined {
        return undefined;
    }
}