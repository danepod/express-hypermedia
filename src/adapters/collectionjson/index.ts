// Collection+JSON Adapter reexports ------------------------------------------
import { Collection } from "./collection";
import { Data } from "./data";
import { Error } from "./error";
import { Item } from "./item";
import { Link } from "./link";
import { Query } from "./query";
import { Template } from "./template";

import { Provider } from "./Provider";
import { Provider as StatusProvider } from "./included/status/provider";

const mime = "application/vnd.collection+json";

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
    Provider,
    mime,
    StatusProvider,
    errorHandler
}