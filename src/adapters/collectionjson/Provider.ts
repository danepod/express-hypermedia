// Dependencies ---------------------------------------------------------------
import { Provider as BaseProvider } from '../../Provider';
import { Options } from '../../interfaces';
import * as CJ from './index';

// Collection+JSON Provider implementation ------------------------------------
export abstract class Provider extends BaseProvider {
    getVersion(options?: Options): number {
        return 1.0;
    }

    getHref(options?: Options): string | undefined {
        return undefined;
    }

    getLinks(options?: Options): CJ.Link[] | undefined {
        return undefined;
    }

    getItems(options?: Options): CJ.Item[] | undefined {
        return undefined;
    }

    getQueries(options?: Options): CJ.Query[] | undefined {
        return undefined;
    }

    getTemplate(options?: Options): CJ.Template | undefined {
        return undefined;
    }

    getError(options?: Options): Error | undefined {
        return undefined;
    }
}