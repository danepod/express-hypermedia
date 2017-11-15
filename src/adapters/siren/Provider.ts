// Dependencies ---------------------------------------------------------------
import { Request, Response, NextFunction } from 'express';

import { Provider as BaseProvider } from "../../Provider";

// Siren Provider implementation ----------------------------------------------
export class Provider extends BaseProvider {
    contentType = 'application/vnd.siren+json';

    handler = (req: Request, res: Response, next: NextFunction) => {
        res.send('Not implemented yet');
    };
}