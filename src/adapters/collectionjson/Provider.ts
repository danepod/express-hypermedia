// Dependencies ---------------------------------------------------------------
import { Provider as BaseProvider } from '../../Provider';
import { Options } from '../../index';
import { Link, Item, Query, Interfaces, Error } from './index';

// Collection+JSON Provider implementation ------------------------------------
export abstract class Provider extends BaseProvider {
    getVersion(options?: Options): number {
        return 1.0;
    }

    getHref(options?: Options): string | undefined {
        return undefined;
    }

    getLinks(options?: Options): Link[] | undefined {
        return undefined;
    }

    getItems(options?: Options): Item[] | undefined {
        return undefined;
    }

    getQueries(options?: Options): Query[] | undefined {
        return undefined;
    }

    getTemplate(options?: Options): Interfaces.Template | undefined {
        return undefined;
    }

    getError(options?: Options): Error | undefined {
        return undefined;
    }
}