// Dependencies ---------------------------------------------------------------
import { Provider as BaseProvider } from '../../Provider';
import { Options } from '../../interfaces';
import * as CJ from './index';

// Collection+JSON Provider implementation ------------------------------------
export class Provider extends BaseProvider {
    entity: CJ.Collection;

    constructor(options?: Options) {
        super();

        this.entity = new CJ.Collection(this, options);
    }

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

    getError(options?: Options): CJ.Error | undefined {
        return undefined;
    }
}