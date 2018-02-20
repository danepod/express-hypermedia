# express-hypermedia

> Create RESTful hypermedia APIs with ease

[![Build Status](https://travis-ci.com/danepod/express-hypermedia.svg?token=CxjnV4mixhFKLGqmq2Zt&branch=master)](https://travis-ci.com/danepod/express-hypermedia)

This library provides the necessary abstractions to easily create hypermedia APIs using [express](https://expressjs.com/). It supports [Siren](https://github.com/kevinswiber/siren) and [Collection+JSON](http://amundsen.com/media-types/collection/format/). Also, additional formats can be used when implemented using the supplied interfaces.

## Example project
An example of `express-hypermedia` in use can be found at https://github.com/danepod/movie-database. This sample project features a small API for movies, demonstrating how to define Resources, ResourceIdentifiers, and making use of content negotiation. It shows how to generate Siren and Collection+JSON responses easily and how to leverage the built-in error handling.

## Installation
Because `express-hypermedia` is part of my bachelor's thesis I cannot open-source and publish it until I finished the work on my thesis. As a result of this, it is not available through npm yet. For now, the installation process is as follows:

*Requirements: NodeJS 8.9.4, Typescript 2.7.2*

1. Download this repository (*the following commands assume you use a terminal with the repository's folder active*)
2. Install dependencies: `npm install`
3. Compile TypeScript to JavaScript: `tsc`
4. To use `express-hypermedia` within another TS/JS project:
   
   Execute `npm link` inside the root folder of `express-hypermedia`. Next, you change to the folder of your project that you want to use `express-hypermedia` with and execute `npm link express-hypermedia`. This way, npm generates a Symlink to the library within the project's node_modules folder. You can now use `express-hypermedia` as if it were normally installed through npm.

**As soon as work on the bachelor's thesis is complete and I recieved the final rating by my university, I will publish the module to npm and update this paragraph accordingyly.**

## Advanced
### API Reference
For the time being, you can generate documentation of this library using [TypeDoc](http://typedoc.org). To generate an HTML reference, install TypeDoc as advised on their website. Then execute `typedoc --out ./docs --exclude **/*.test.ts ./src` and open [docs/index.html](docs/index.html). I will try to enhance the generation and usefulness of the docs at a later point. Also, I will describe the usage of the library in greater detail in a user's manual which I will write as part of my bachelor's thesis.

### Tests
This project includes a suite of unit tests, using [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/). At this time, most of the tests cover the logic outside of format adapters. Test files are named `*.test.ts`.

The following commands can be used to execute these tests:
* `npm test` to run each available test
* `npm run coverage` to run every test and generate a code coverage report using [nyc](https://istanbul.js.org/). This generates a machine-readable LCOV report as well as HTML pages in the folder `./coverage`

### Implementing a custom adapter for additional formats

## See also
 * My [Wissenschaftliche Vertiefung](https://github.com/danepod/wissenschaftliche-vertiefung) (German) covering REST, hypermedia formats and the application of HATEOAS for APIs in the Web. The last chapter explains the rationale behind this project.

 * The [Bachelorarbeit (bachelor's thesis)](https://github.com/danepod/bachelorarbeit) (German) documenting this project. It is the final paper of my studies in the course of "Bachelor of Science Medieninformatik" at Hochschule Düsseldorf.

## License
Until the bachelor's thesis covering this project is finished, `express-hypermedia` remains unlicensed. I will publish and open-source it as soon as I can.