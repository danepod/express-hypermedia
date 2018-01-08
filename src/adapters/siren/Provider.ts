// Dependencies ---------------------------------------------------------------
import { Provider as BaseProvider } from "../../Provider";
import  * as Siren from './index';

// Siren Provider implementation ----------------------------------------------
export class Provider extends BaseProvider {
    entity: Siren.Entity;

    constructor(options?: Object) {
        super();

        this.entity = new Siren.Entity(this, options);
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