# express-hypermedia

> Create RESTful hypermedia APIs with ease

[![Build Status](https://travis-ci.com/danepod/express-hypermedia.svg?token=CxjnV4mixhFKLGqmq2Zt&branch=master)](https://travis-ci.com/danepod/express-hypermedia)

This library provides the necessary abstractions to easily create hypermedia APIs using [express](https://expressjs.com/). It supports [Siren](https://github.com/kevinswiber/siren) and [Collection+JSON](http://amundsen.com/media-types/collection/format/). Also, additional formats can be used when implemented using the supplied interfaces.

## Example project
An example of `express-hypermedia` in use can be found at https://github.com/danepod/movie-database. This sample project features a small API for movies, demonstrating how to define Resources, ResourceIdentifiers, and making use of content negotiation. It shows how to generate Siren and Collection+JSON responses easily and how to leverage the built-in error handling. It also demonstrates the usage of an [external adapter](https://github.com/danepod/hal-adapter) to leverage the [HAL](http://stateless.co/hal_specification.html) format. Besides demonstrating the usage of these features, it shows a simple structure to organize the source code for a project using `express-hypermedia`.

## Installation
Because `express-hypermedia` is part of my bachelor's thesis I cannot open-source and publish it until I finished the work on my thesis. As a result of this, it is not available through npm yet. For now, the installation process is as follows:

*Requirements: NodeJS >= 8.9.4*

1. Download this repository (*the following commands assume you use a terminal with the repository's folder active*)
2. Install dependencies: `npm install`, this also automatically compiles the project via TypeScript
3. (*Temporary*) To use `express-hypermedia` within another TS/JS project:
   
   Execute `npm link` inside the root folder of `express-hypermedia`. Next, you change to the folder of your project that you want to use `express-hypermedia` with and execute `npm link express-hypermedia`. This way, npm generates a Symlink to the library within the project's node_modules folder. You can now use `express-hypermedia` as if it were normally installed through npm.

**As soon as work on the bachelor's thesis is complete and I recieved the final rating by my university, I will publish the module to npm and update this paragraph accordingyly.**

## Installation (after the library has been published)
This module is available through the [npm registry](https://www.npmjs.com/). To use this in your project, install it using

````npm install express-hypermedia --save```.

*You need to use at least NodeJS 8.9.4 to use this library.* Further instructions on how to use `express-hypermedia` can be found in [FIRSTSTEPS.md](FIRSTSTEPS.md).

## Advanced
### API Reference
You can generate documentation of this library using [TypeDoc](http://typedoc.org). To generate an HTML reference, execute `npm run doc` and open [docs/index.html](docs/index.html).

### Tests
This project includes a suite of unit tests, using [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/). At this time, most of the tests cover the logic outside of format adapters. Test files are named `*.test.ts`.

The following commands can be used to execute these tests:
* `npm test` to run each available test
* `npm run coverage` to run every test and generate a code coverage report using [nyc](https://istanbul.js.org/). This generates a machine-readable LCOV report as well as HTML pages in the folder `./coverage`
* `npm run testfile </path/to/a.test.js>` to run the tests of a single file

### Linting
`express-hypermedia` uses [TSLint](https://palantir.github.io/tslint/) to perform static code analysis. This is done to keep the code consistent and maintain readability.

To see any warnings emitted by TSLint, either
* execute `npm run lint`
* use a code editor like [Visual Studio Code](https://code.visualstudio.com/) which shows linting warnings for each opened file automatically

### Implementing a custom adapter for additional formats
This library contains two adapters to create responses, one for Siren and the other for Collection+JSON. However, support for additional formats can be added through external adapters. By extending upon the `Entity`, `Provider` and `Action` classes, it is possible to implement other hypermedia formats. One example of this is the HAL adapter mentioned above.

## See also
 * My [Wissenschaftliche Vertiefung](https://danepod.github.io/wissenschaftliche-vertiefung/) (German) covering REST, hypermedia formats and the application of HATEOAS for APIs in the Web. The last chapter explains the rationale behind this project.

 * The [Bachelorarbeit (bachelor's thesis)](https://danepod.github.io/bachelorarbeit/) (German) documenting this project. It is the final paper of my studies in the course of "Bachelor of Science Medieninformatik" at Hochschule Düsseldorf.

 * The [Siren specification](https://github.com/kevinswiber/siren), as parts of this were used to create the JSDoc comments for the Siren adapter. Also, to use the adapter, it is necessary to know the basics of Siren which can be obtained there.

 * The [Collection+JSON specification](http://amundsen.com/media-types/collection/format/) because to fully leverage the builtin Collection+JSON adapter, basic knowledge of the format is necessary.

## License
Until the bachelor's thesis covering this project is finished, `express-hypermedia` remains unlicensed. I will publish and open-source it as soon as I can.