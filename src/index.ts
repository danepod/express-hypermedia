import { Resource } from './Resource';
import { ResourceIdentifier } from './ResourceIdentifier';
import * as Interfaces from './interfaces';
import { RequestError, errorMiddleware, errorHandlerFunction } from "./error";

import { Entity } from "./Entity";
import { Provider } from "./Provider";
import { Action } from "./Action";

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
    errorHandlerFunction,
    Entity,
    Provider,
    Action
};