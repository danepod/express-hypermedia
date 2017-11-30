// Dependencies ---------------------------------------------------------------
import { Provider as BaseProvider } from "../../Provider";
import  * as Siren from './index';
import { Options } from '../../interfaces';

// Siren Provider implementation ----------------------------------------------
export abstract class Provider extends BaseProvider {
    getClass(options?: Options): string[] | undefined {
        return undefined;
    }

    getTitle(options?: Options): string | undefined {
        return undefined;
    }

    getProperties(options?: Options): object | undefined {
        return undefined;
    }

    getEntities(options?: Options): (Siren.EmbeddedLink | Siren.EmbeddedRepresentation)[] | undefined {
        return undefined;
    }
    
    getActions(options?: Options): Siren.Action[] | undefined {
        return undefined;
    }

    getLinks(options?: Options): Siren.Link[] | undefined {
        return undefined;
    }
}