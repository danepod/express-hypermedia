import { expect } from "chai";
import "mocha";

import { ResourceIdentifier } from "./ResourceIdentifier";
import { Request, Response } from 'express';
import { RequestError } from "./error";

describe("Test ResourceIdentifier", () => {

    it("should instantiate the ResourceIdentifier using the given url and an array of keywords", () => {
        const rid = new ResourceIdentifier("/", ["foo", "bar"]);

        expect(rid.url).to.equal("/");
        expect(rid.keywords).to.deep.equal(["foo", "bar"]);
    });

    it("should instantiate the ResourceIdentifier using the given url and a single keyword", () => {
        const rid = new ResourceIdentifier("/", "foo");

        expect(rid.url).to.equal("/");
        expect(rid.keywords).to.deep.equal(["foo"]);
    });

    it("should instantiate the ResourceIdentifier using the given url and a no keywords", () => {
        const rid = new ResourceIdentifier("/");

        expect(rid.url).to.equal("/");
        expect(rid.keywords).to.deep.equal([]);
    });

    it("should add a handler when given one", () => {
        const rid = new ResourceIdentifier("/");

        const handlers = {
            "GET": () => "GET",
            "POST": () => "POST"
        };

        rid.addHandlers("application/json", handlers);

        expect(rid.handlers["GET"]["application/json"](<Request> {}, <Response> {}, () => {})).to.equal(handlers["GET"]());
    });

    it("should add a handler when given one, also using it as the fallback if no other format matches the Request", () => {
        const rid = new ResourceIdentifier("/");

        const handlers = {
            "GET": () => "GET",
            "POST": () => "POST"
        };

        rid.addHandlers("application/json", handlers, true);

        expect(rid.handlers["GET"]["application/json"](<Request> {}, <Response> {}, () => {})).to.equal(handlers["GET"]());

        expect(rid.handlers["GET"]["default"](<Request> {}, <Response> {}, () => {})).to.equal(handlers["GET"]());
    });

    it("should perform content negotiation using an intermediate request handler that returns the actual handler based on the requests accept handler", () => {
        const rid = new ResourceIdentifier("/");

        const handlersJSON = {
            "GET": () => "GET JSON",
            "POST": () => "POST JSON"
        };

        const handlersXML = {
            "GET": () => "GET XML"
        };

        rid.addHandlers("application/json", handlersJSON);
        rid.addHandlers("application/xml", handlersXML);

        const route = rid.getRoute();

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
        const rid = new ResourceIdentifier("/");

        const handlersJSON = {
            "GET": () => "GET JSON",
            "POST": () => "POST JSON"
        };

        rid.addHandlers("application/json", handlersJSON, true);

        const route = rid.getRoute();

        const mockRequest = <Request> {
            header: (header: string) => "*/*"
        };
        const mockResponse = <Response> {};

        expect(route["GET"](mockRequest, mockResponse, () => {})).to.equal(handlersJSON["GET"]());
        expect(route["POST"](mockRequest, mockResponse, () => {})).to.equal(handlersJSON["POST"]());
    });

    it("should throw an error if no fallback route handler exists and the client requests an unavailable format (but would accept a fallback)", () => {
        const rid = new ResourceIdentifier("/");

        const handlersJSON = {
            "GET": () => "GET JSON"
        };

        rid.addHandlers("application/json", handlersJSON);

        const route = rid.getRoute();

        const mockRequest = <Request> {
            header: (header: string) => "text/plain,*/*"
        };
        const mockResponse = <Response> {};

        expect(() => route["GET"](mockRequest, mockResponse, () => {})).to.throw(RequestError, 'Format not supported');
    });

    it("should throw an error if a fallback route handler exists but the client doesn't accept a fallback", () => {
        const rid = new ResourceIdentifier("/");

        const handlersJSON = {
            "GET": () => "GET JSON"
        };

        rid.addHandlers("application/json", handlersJSON, true);

        const route = rid.getRoute();

        const mockRequest = <Request> {
            header: (header: string) => "text/plain"
        };
        const mockResponse = <Response> {};

        expect(() => route["GET"](mockRequest, mockResponse, () => {})).to.throw(RequestError, 'Format not supported');
    });
});