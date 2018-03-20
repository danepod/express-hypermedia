# First Steps for using `express-hypermedia`

> Note that a full API documentation can be found at [docs/index.html](docs/index.html). You may need to run `npm run doc` to create this if you can't find the docs there.

This document describes how to begin developing an application using this library. Beside this guide, also take a look at the sample project [movie-database](https://github.com/danepod/movie-database) which uses all features of `express-hypermedia` to create a simple CRUD hypermedia API.

Please bear in mind that this library is an extension to [Express](https://expressjs.com/) that adds a layer of abstraction to it. It is best to have prior knowledge in developing vanilla Express applications before attempting to use this library.

## Resource and ResourceIdentifier
This library offers a way to create routes by defining resources instead of Routers constisting of hardcoded URLs. This is done through the usage of two classes: `Resource` and `ResourceIdentifier`. A Resource is a way of defining a "thing". To use Roy Fieldings definition of the term: "Any information that can be named can be a resource: a document or image, a temporal service (e.g. "today's weather in Los Angeles"), a collection of other resources, a non-virtual object (e.g. a person), and so on. In other words, any concept that might be the target of an author's hypertext reference must fit within the definition of a resource" ([Fielding, 2000](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_2_1_1)).

This is an example of how to use the `Resource` class, provided by `express-hypermedia`:

```
// app.ts
import * as express from "express";
import { Resource } from "express-hypermedia";

// These two objects are ResourceIdentifiers, described below
import { movieDetail } from "./resources/movie/detail";
import { movieList } from "./resources/movie/list";

const app = express();

const movieResource = new Resource("movie", "/movies");

movieResource.addIdentifiers([movieList, movieDetail]);

app.use(movieResource.getExpressRouter());
```
Create a Resource and add ResourceIdentifier objects to it. As a last step, by calling `getExpressRouter()`, you can generate an Express `Router` object and handle it like any other router.

ResourceIdentifiers are used to identify particular resources, such as (in this example) a list of movies or a detailed view of a particular movie. To create a ResourceIdentifier, follow this example:

```
// resources/movie/list/index.ts
import { ResourceIdentifier } from "express-hypermedia";

const movieList = new ResourceIdentifier("/", ["movie", "list"]);

movieList.addHandlers("application/json", {
    GET: (req, res, next) => {
        const movieList = /* Create movie list here */
        res.json(movieList);
    },
    POST: (req, res, next) => { /* ... */}
}, true);

export { movieList }
```
A ResourceIdentifier is created for each distinguishable resource. In this case, one for a list of movies was created. `express-hypermedia` takes care of content negotiation automatically. All you need to do is to call `addHandlers()` for every format you want to support. The first parameter specifies the desired format, the second parameter is an object containing all route handler functions (these are basically Express handler functions) indexed by the HTTP verb to use the handler. The third parameter is optional and by setting it to `true`, the handlers stated in that call to `addHandlers()` are defined as fallback – so requests that don't match the available formats still return something instead of an HTTP 406 (Not acceptable) error.

Every ResourceIdentifier you add to a Resource that gets used in your application gets automatically converted so it can be used by Express. During this process, the URLs of every Resource and each ResourceIdentifier gets combined. In the example above, the URL to a movie list is `/movies/`. If a detailled view of a movie was created using `new ResourceIdentifier("/:id", ["movie", "detail"])`, the URL of a single movie would be `/movies/:id` (you can use templated URLs as this is Express, after all).

## Using a hypermedia format adapter
The main feature of this library are the hypermedia format adapters. `express-hypermedia` supports two formats right away, Siren and Collection+JSON. To use one of these formats, you need to understand the basic structure of the format you want to use as well as some general knowledge of the classes each adapter provides.

Each adapter at least implements an `Entity`, which represents the root document of a given format. This is the structure which is part of every response and is defined in the specification of the used format. While an Entity describes the basic structure of a hypermedia document, every adapter provides an abstract `Provider` class. This is used to fill in the blanks of an Entity to create the response that gets sent to a client requesting data.

To use a Provider, you need to implement its methods yourself and instantiate it in the route handler. The following is a shortened example of one such Provider, creating a list of movies for a Siren response:

```
// resources/movie/list/siren/provider.ts
import { Siren } from "express-hypermedia";
import { POSTMovie, SearchMovie } from "./actions";

export class Provider extends Siren.Provider {
    getClass() {
        return ["movie", "list"];
    }

    getEntities() {
        const entities = [];
        const movies = /* Call business logic to get all available movies */;

        movies.forEach((value, index) => {
            // Create embedded movie entities
        });

        return entities;
    }

    getLinks() {
        return [new Siren.Link("self", `http://localhost:3000/movies`)];
    }

    getActions() {
        return [ new POSTMovie(), new SearchMovie() ];
    }
}
```
After implementing a Provider, you can use it by instantiating it inside the route handler. To do this for our example, we change the route handler defined above:

```
// resources/movie/list/index.ts
import { ResourceIdentifier } from "express-hypermedia";
import { Provider as SirenListProvider } from "./siren/provider.ts"

const movieList = new ResourceIdentifier("/", ["movie", "list"]);

movieList.addHandlers("application/json", {
    GET: (req, res, next) => {
        const movieList = new SirenListProvider();
        res.json(movieList);
    },
    POST: (req, res, next) => { /* ... */}
}, true);

export { movieList }
```
This is a very simple example of how to use a Provider. Take a look into the [movie-database](https://github.com/danepod/movie-database) example and the [API documentation](docs/index.html) to see how to leverage the options object, create Providers for other formats, and create Actions to communicate how a client can query or manipulate resources.

## Use the builtin error handling middleware
The library offers a specified Error class, `RequestError` to use within route handlers and Providers. This class works in tandem with a special error middleware. Together, these components can be used to communicate details about errors when processing requests. You can throw an error with a user-readable message and an HTTP status code, the middleware will then send a response containing this information to the client. While doing this, the error middleware will adhere to the format, the client specified using the `Accept` header in its request.

To use the middleware, add it to your Express app:

```
// app.ts
app.use(errorMiddleware({
    "application/vnd.siren+json": Siren.errorHandler,
    "application/vnd.collection+json": CJ.errorHandler,
    "text/html": (status, message, error) => {
        return `
            <html>
            <head>
                <title>${message}</title>
            </head>
            <body>
                Message: ${message}<br />
                Error: ${error}<br />
                Status: ${status}
            </body>
            </html>`;
    }
}));
```
The included adapters implement an error handler, you can pass over when calling the `errorMiddleware()`. You can also implement an own error handler, such as the one shown for HTML. If no format handler is passed over, every request resulting in an error will be answered with a simple JSON response.

To yield an error during request processing, simply throw a RequestError inside a route handler, Provider or Action like this:

```
throw new RequestError("Movie not found", 404);
```

## Leveraging external adapters for other formats
You don't need to restrict yourself to the builtin formats Siren and Collection+JSON. In case you want to handle other formats as well, implement an adapter for each format. An example of this can be seen with [hal-adapter](https://github.com/danepod/hal-adapter), which implements the [HAL format](http://stateless.co/hal_specification.html).

Basically, every adapter needs to implement the Provider, Entity and Action classes as well as classes describing the structure of the format. A good place to get the needed information to do this is the specification of the format you want to implement. New adapters should best be implemented as their own modules and published to NPM.