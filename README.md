# express-hypermedia

[![Build Status](https://travis-ci.com/danepod/express-hypermedia.svg?token=CxjnV4mixhFKLGqmq2Zt&branch=master)](https://travis-ci.com/danepod/express-hypermedia)

Create RESTful hypermedia APIs with ease

This library provides the necessary abstractions to easily create hypermedia APIs using [express](https://expressjs.com/). It supports [Siren](https://github.com/kevinswiber/siren) and [Collection+JSON](http://amundsen.com/media-types/collection/format/). Also, additional formats can be used when implemented using the supplied interfaces.

## Background

## Usage

## Example project

## Installation
Because `express-hypermedia` is part of my bachelor's thesis I cannot open-source and publish it until I finished the work on my thesis. As a result of this, it is not available through npm yet. For now, the installation process is as follows:

*Requirements: NodeJS 8.9.4, Typescript 2.6.2*

1. Download this repository (*the following commands assume you use a terminal with the repository's folder active*)
2. Install dependencies: `npm install`
3. Compile TypeScript to JavaScript: `tsc`
4. To use `express-hypermedia` within another TS/JS project:
   
   Execute `npm link` inside the root folder of `express-hypermedia`. Next, you change to the folder of your project that you want to use `express-hypermedia` with and execute `npm link express-hypermedia`. This way, npm generates a Symlink to the library within the project's node_modules folder. You can now use `express-hypermedia` as if it were normally installed through npm.

**As soon as work on the bachelor's thesis is complete and I recieved the final rating by my university, I will publish the module to npm and update this paragraph accordingyly.**

## Implementing a custom adapter for additional formats

## See also

## License
