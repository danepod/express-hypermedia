import { Resource } from './Resource';
import { Representation } from './Representation';
import * as Interfaces from './interfaces';
import { RequestError, errorMiddleware, errorHandlerFunction } from "./error";

import * as Siren from './adapters/siren';
import * as CJ from './adapters/collectionjson';

export { 
    Resource,
    Representation,
    Interfaces,
    Siren,
    CJ,
    RequestError,
    errorMiddleware,
    errorHandlerFunction
};