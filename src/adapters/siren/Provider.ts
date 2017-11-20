// Dependencies ---------------------------------------------------------------
import { Request, Response, NextFunction } from 'express';

import { Provider as BaseProvider } from "../../Provider";

// Siren Provider implementation ----------------------------------------------
export class Provider extends BaseProvider {
    contentType = 'application/vnd.siren+json';

    // TODO: If given Entity instance, the provider should generate a simple handler by itself
    handler = (req: Request, res: Response, next: NextFunction) => {
        // TODO: Generate Error entity for this message
        res.send('Not implemented yet');
    };
}