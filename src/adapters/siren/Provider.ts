// Dependencies ---------------------------------------------------------------
import { Provider as BaseProvider } from "../../Provider";
import * as Siren from './index';

// Siren Provider implementation ----------------------------------------------
export abstract class Provider extends BaseProvider {
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

    getClass(options?: Object): string[] | undefined {
        return undefined;
    }

    getTitle(options?: Object): string | undefined {
        return undefined;
    }

    getProperties(options?: Object): object | undefined {
        return undefined;
    }

    getEntities(options?: Object): (Siren.EmbeddedLink | Siren.EmbeddedRepresentation)[] | undefined {
        return undefined;
    }
    
    getActions(options?: Object): Siren.Action[] | undefined {
        return undefined;
    }

    getLinks(options?: Object): Siren.Link[] | undefined {
        return undefined;
    }
}