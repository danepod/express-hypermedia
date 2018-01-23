// Siren Adapter reexports ----------------------------------------------------
import { Entity } from './entity';
import { Link } from './link';
import { Action } from './action';
import { EmbeddedLink, EmbeddedRepresentation } from './subentity';

import * as Interfaces from './interfaces';
import { Provider } from './Provider';
import { Provider as ErrorProvider } from './included/error/provider';
import { Provider as StatusProvider } from "./included/status/provider";

const mime = "application/vnd.siren+json";

const errorHandler = (status: number, message: string, error: string | undefined) => {
    return new ErrorProvider({
        status,
        message,
        error
    });
}

export {
    Entity,
    Link,
    Action,
    EmbeddedLink,
    EmbeddedRepresentation,
    Provider,
    Interfaces,
    mime,
    ErrorProvider,
    StatusProvider,
    errorHandler
}