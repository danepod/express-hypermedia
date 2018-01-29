import { Resource } from './Resource';
import { ResourceIdentifier } from './ResourceIdentifier';
import * as Interfaces from './interfaces';
import { RequestError, errorMiddleware, errorHandlerFunction } from "./error";

import * as Siren from './adapters/siren';
import * as CJ from './adapters/collectionjson';

export { 
    Resource,
    ResourceIdentifier,
    Interfaces,
    Siren,
    CJ,
    RequestError,
    errorMiddleware,
    errorHandlerFunction
};