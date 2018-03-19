// Collection+JSON Adapter reexports ------------------------------------------
import { Collection } from "./collection";
import { Data } from "./data";
import { Error } from "./error";
import { Render } from "./interfaces";
import { Item } from "./item";
import { Link } from "./link";
import { Query } from "./query";
import { Template } from "./template";

import { Provider } from "./Provider";
// tslint:disable-next-line:ordered-imports This MUST be imported after Provider because it depends on it. If not done this way, this will fail in runtime!
import { Provider as StatusProvider } from "./included/status/provider";

/**
 * The MIME type of this adapter
 */
const mime = "application/vnd.collection+json";

/**
 * The error handling middleware function of the Collection+JSON adapter. Pass this on to errorMiddleware() to enable Collection+JSON formatted error messages
 * @param status HTTP status code
 * @param message Human-readable message describing the error
 * @param error Further information regading the error, e.g. a stack trace. May be undefined in production environments
 */
const errorHandler = (status: number, message: string, error: string | undefined) => {
    return new StatusProvider({
        title: message,
        message: error
    });
};

export {
    Collection,
    Data,
    Error,
    Item,
    Link,
    Query,
    Template,
    Render,
    Provider,
    mime,
    StatusProvider,
    errorHandler
};
