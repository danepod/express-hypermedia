import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

import * as express from "express";
import { errorMiddleware, RequestError } from "./error";
import { Siren, CJ } from "./index";

describe("Test RequestError", () => {

    it("should generate a RequestError object using only a message", () => {
        const err = new RequestError("Server error");

        expect(err.message).to.equal("Server error");
    });

    it("should generate a RequestError object using a message and error code", () => {
        const err = new RequestError("Not found", 404);

        expect(err.message).to.equal("Not found");
        expect(err.status).to.equal(404);
    });
});

describe("Test errorMiddleware", () => {

    it("should send a default JSON error response, continue middleware chain with error", () => {
        // Mock request and respone objects by hand because their original constructors are hidden within express and we don't need everything from them
        const req = <express.Request> {
            header: (header: string) => "*/*",
            app: {
                get: (envVar: string) => "test"
            }
        };
        const res = <express.Response> {
            status: (code: number) => {},
            json: (obj: Object) => {
                // This contains the assertion; changing the res object is a side effect of an express middleware, by design
                expect(obj).to.deep.equal({
                    status: 404,
                    message: "Not found",
                    error: ""
                });
            }
        };
        // Also add a spy on a callback function to see if it is called
        const next = sinon.spy((err: RequestError) => {});

        // Create RequestError object
        const err = new RequestError("Not found", 404);
        
        // Invoke errorMiddleware
        errorMiddleware(err, req, res, next);

        // First assertion can be found in res.json above

        // Expect the next callback in the chain to be called with the error object
        sinon.assert.calledOnce(next.withArgs(err));
    });

    
    it("should send a Siren error response, continue middleware chain with error", () => {
        // Mock request and respone objects by hand because their original constructors are hidden within express and we don't need everything from them
        const req = <express.Request> {
            header: (header: string) => "application/vnd.siren+json",
            app: {
                get: (envVar: string) => "test"
            }
        };
        const res = <express.Response> {
            status: (code: number) => {},
            json: (obj: Object) => {
                // This contains the assertion; changing the res object is a side effect of an express middleware, by design
                expect(obj).to.deep.equal(new Siren.ErrorProvider({
                    status: 404,
                    message: "Not found",
                    error: ""
                }));
            }
        };

        // Create RequestError object
        const err = new RequestError("Not found", 404);
        
        // Invoke errorMiddleware
        errorMiddleware(err, req, res, () => {});

        // Assertion can be found in res.json above
    });

    it("should send a CJ error response, continue middleware chain with error", () => {
        // Mock request and respone objects by hand because their original constructors are hidden within express and we don't need everything from them
        const req = <express.Request> {
            header: (header: string) => "application/vnd.collection+json",
            app: {
                get: (envVar: string) => "test"
            }
        };
        const res = <express.Response> {
            status: (code: number) => {},
            json: (obj: Object) => {
                // This contains the assertion; changing the res object is a side effect of an express middleware, by design
                expect(obj).to.deep.equal(new CJ.StatusProvider({
                    title: "Not found",
                    message: ""
                }));
            }
        };

        // Create RequestError object
        const err = new RequestError("Not found", 404);
        
        // Invoke errorMiddleware
        errorMiddleware(err, req, res, () => {});

        // Assertion can be found in res.json above
    });

    it("should send a default JSON error response (containing a stack trace), continue middleware chain with error", () => {
        // Mock request and respone objects by hand because their original constructors are hidden within express and we don't need everything from them
        const req = <express.Request> {
            header: (header: string) => "*/*",
            app: {
                get: (envVar: string) => "development"
            }
        };
        const res = <express.Response> {
            status: (code: number) => {},
            json: (obj: any) => {
                // This contains the assertion; changing the res object is a side effect of an express middleware, by design
                expect(obj).to.deep.equal({
                    status: 404,
                    message: "Not found",
                    error: err.stack
                });
            }
        };

        // Create RequestError object
        const err = new RequestError("Not found", 404);
        
        // Invoke errorMiddleware
        errorMiddleware(err, req, res, () => {});

    });

    it("should continue with the middleware chain after sending the response", () => {
        // Mock request and respone objects by hand because their original constructors are hidden within express and we don't need everything from them
        const req = <express.Request> {
            header: (header: string) => "*/*",
            app: {
                get: (envVar: string) => "test"
            }
        };
        const res = <express.Response> {
            status: (code: number) => {},
            json: (obj: Object) => {}
        };
        // Also add a spy on a callback function to see if it is called
        const next = sinon.spy((err: RequestError) => {});

        // Create RequestError object
        const err = new RequestError("Not found", 404);
        
        // Invoke errorMiddleware
        errorMiddleware(err, req, res, next);

        // Expect the next callback in the chain to be called with the error object
        sinon.assert.calledOnce(next.withArgs(err));
    });
});