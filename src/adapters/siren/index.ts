// Siren Adapter reexports ----------------------------------------------------
import { Entity } from './entity';
import { Link } from './link';
import { Action } from './action';
import { EmbeddedLink, EmbeddedRepresentation } from './subentity';

import * as Interfaces from './interfaces';
import { Provider } from './Provider';
import { Provider as ErrorProvider } from './included/error/provider';
import { Provider as StatusProvider } from "./included/status/provider";

/**
 * The MIME type of this adapter
 */
const mime = "application/vnd.siren+json";

/**
 * The error handling middleware function of the Siren adapter. Pass this on to errorMiddleware() to enable Siren formatted error messages
 * @param status HTTP status code
 * @param message Human-readable message describing the error
 * @param error Further information regading the error, e.g. a stack trace. May be undefined in production environments
 */
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