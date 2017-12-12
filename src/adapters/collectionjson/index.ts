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
    StatusProvider
}