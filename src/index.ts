import { errorHandlerFunction, errorMiddleware, RequestError } from "./error";
import * as Interfaces from "./interfaces";
import { Resource } from "./Resource";
import { ResourceIdentifier } from "./ResourceIdentifier";

import { Action } from "./Action";
import { Entity } from "./Entity";
import { Provider } from "./Provider";

import * as CJ from "./adapters/collectionjson";
import * as Siren from "./adapters/siren";

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
