import { expect } from "chai";
import "mocha";

import { Representation, sortAcceptHeader } from "./Representation";
import { Request, Response } from 'express';
import { RequestError } from "./error";

describe("Test Representation", () => {

    it("should instantiate the Representation using the given url and an array of keywords", () => {
        const rep = new Representation("/", ["foo", "bar"]);

        expect(rep.url).to.equal("/");
        expect(rep.keywords).to.deep.equal(["foo", "bar"]);
    });

    it("should instantiate the Representation using the given url and a single keyword", () => {
        const rep = new Representation("/", "foo");

        expect(rep.url).to.equal("/");
        expect(rep.keywords).to.deep.equal(["foo"]);
    });

    it("should instantiate the Representation using the given url and a no keywords", () => {
        const rep = new Representation("/");

        expect(rep.url).to.equal("/");
        expect(rep.keywords).to.deep.equal([]);
    });

    it("should add a handler when given one", () => {
        const rep = new Representation("/");

        const handlers = {
            "GET": () => "GET",
            "POST": () => "POST"
        };

        rep.addHandlers("application/json", handlers);

        expect(rep.handlers["GET"]["application/json"](<Request> {}, <Response> {}, () => {})).to.equal(handlers["GET"]());
    });

    it("should add a handler when given one, also using it as the fallback if no other format matches the Request", () => {
        const rep = new Representation("/");

        const handlers = {
            "GET": () => "GET",
            "POST": () => "POST"
        };

        rep.addHandlers("application/json", handlers, true);

        expect(rep.handlers["GET"]["application/json"](<Request> {}, <Response> {}, () => {})).to.equal(handlers["GET"]());

        expect(rep.handlers["GET"]["default"](<Request> {}, <Response> {}, () => {})).to.equal(handlers["GET"]());
    });

    it("should perform content negotiation using an intermediate request handler that returns the actual handler based on the requests accept handler", () => {
        const rep = new Representation("/");

        const handlersJSON = {
            "GET": () => "GET JSON",
            "POST": () => "POST JSON"
        };

        const handlersXML = {
            "GET": () => "GET XML"
        };

        rep.addHandlers("application/json", handlersJSON);
        rep.addHandlers("application/xml", handlersXML);

        const route = rep.getRoute();

        const mockRequestJSON = <Request> {
            header: (header: string) => "application/json"
        };
        const mockRequestXML = <Request> {
            header: (header: string) => "application/xml"
        };
        const mockResponse = <Response> {};

        expect(route["GET"](mockRequestJSON, mockResponse, () => {})).to.equal(handlersJSON["GET"]());
        expect(route["POST"](mockRequestJSON, mockResponse, () => {})).to.equal(handlersJSON["POST"]());
        expect(route["GET"](mockRequestXML, mockResponse, () => {})).to.equal(handlersXML["GET"]());
    });

    it("should return a default route handler if one exists and the client accepts all formats", () => {
        const rep = new Representation("/");

        const handlersJSON = {
            "GET": () => "GET JSON",
            "POST": () => "POST JSON"
        };

        rep.addHandlers("application/json", handlersJSON, true);

        const route = rep.getRoute();

        const mockRequest = <Request> {
            header: (header: string) => "*/*"
        };
        const mockResponse = <Response> {};

        expect(route["GET"](mockRequest, mockResponse, () => {})).to.equal(handlersJSON["GET"]());
        expect(route["POST"](mockRequest, mockResponse, () => {})).to.equal(handlersJSON["POST"]());
    });

    it("should throw an error if no fallback route handler exists and the client requests an unavailable format (but would accept a fallback)", () => {
        const rep = new Representation("/");

        const handlersJSON = {
            "GET": () => "GET JSON"
        };

        rep.addHandlers("application/json", handlersJSON);

        const route = rep.getRoute();

        const mockRequest = <Request> {
            header: (header: string) => "text/plain,*/*"
        };
        const mockResponse = <Response> {};

        expect(() => route["GET"](mockRequest, mockResponse, () => {})).to.throw(RequestError, 'Format not supported');
    });

    it("should throw an error if a fallback route handler exists but the client doesn't accept a fallback", () => {
        const rep = new Representation("/");

        const handlersJSON = {
            "GET": () => "GET JSON"
        };

        rep.addHandlers("application/json", handlersJSON, true);

        const route = rep.getRoute();

        const mockRequest = <Request> {
            header: (header: string) => "text/plain"
        };
        const mockResponse = <Response> {};

        expect(() => route["GET"](mockRequest, mockResponse, () => {})).to.throw(RequestError, 'Format not supported');
    });


    [{
        header: "text/*;q=0.3,text/html;q=0.7, text/html;level=1, text/html;level=2;q=0.4, */*;q=0.5",
        expected: ["text/html", "*/*", "text/*"]
    }, {
        header: "application/vnd.collection+json",
        expected: ["application/vnd.collection+json"]
    }].forEach((test) => {

        it("should order formats in the Accept header mostly according to RFC2616, ignoring everything but the q parameter", () => {
            expect(sortAcceptHeader(test.header)).to.deep.equal(test.expected);
        });

    });
});