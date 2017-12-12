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
    StatusProvider
}