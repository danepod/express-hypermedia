// Dependencies ---------------------------------------------------------------
import { Provider as BaseProvider } from '../../Provider';
import * as CJ from './index';

// Collection+JSON Provider implementation ------------------------------------
export class Provider extends BaseProvider {
    entity: CJ.Collection;

    constructor(options?: Object) {
        super();

        this.entity = new CJ.Collection(this, options);
    }

    getVersion(options?: Object): number {
        return 1.0;
    }

    getHref(options?: Object): string | undefined {
        return undefined;
    }

    getLinks(options?: Object): CJ.Link[] | undefined {
        return undefined;
    }

    getItems(options?: Object): CJ.Item[] | undefined {
        return undefined;
    }

    getQueries(options?: Object): CJ.Query[] | undefined {
        return undefined;
    }

    getTemplate(options?: Object): CJ.Template | undefined {
        return undefined;
    }

    getError(options?: Object): CJ.Error | undefined {
        return undefined;
    }
}