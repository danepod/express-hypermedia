// Dependencies ---------------------------------------------------------------
import { Request, Response, NextFunction } from 'express';

import { Provider as BaseProvider } from '../../Provider';

// Collection+JSON Provider implementation ------------------------------------
export class Provider extends BaseProvider {
    contentType = 'application/vnd.collection+json';

    // TODO: If given Collection instance, the provider should generate a simple handler by itself
    handler = (req: Request, res: Response, next: NextFunction) => {
        // TODO: Generate Error collection for this message
        res.send('Not implemented yet');
    }
}