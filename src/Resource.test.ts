import { expect } from "chai";
import "mocha";

import { Resource, Representation } from "./index";

describe("Test Resource", () => {

    it("should instantiate the Resource using the given name and URL", () => {
        const res = new Resource("foo", "/bar");

        expect(res.name).to.equal("foo");
        expect(res.url).to.equal("/bar");
    });

    it("should prepend a forward slash for the URL if missing when instantiating", () => {
        const res = new Resource("foo", "bar");

        expect(res.name).to.equal("foo");
        expect(res.url).to.equal("/bar");
    });

    it("should generate an URL when only given a name on instantiation", () => {
        const res = new Resource("test");

        expect(res.name).to.equal("test");
        expect(res.url).to.equal("/tests");
    });

    it("should add a representation when given one", () => {
        // Create a dummy representation
        const rep = <Representation> {};

        const res = new Resource("foo");
        res.addRepresentations(rep);

        expect(res.representations).to.be.length(1).and.contain(rep);
    });

    it("should add multiple representations given in an array", () => {
        // Create a dummy representation
        const rep1 = <Representation> {},
              rep2 = <Representation> {};

        const res = new Resource("foo");
        res.addRepresentations([rep1, rep2]);

        expect(res.representations).to.be.length(2).and.contain(rep1).and.contain(rep2);
    });

    it("should return an express router containing all routes defined in the representations", () => {
        // FIXME: This feels more like an integration test. Try to split it futher, mocking the used Representation instances.

        // Prepare two Representations and a Resource
        const rep1 = new Representation('/', ['bar']),
              rep2 = new Representation('/:id', ['baz']);

        const handler = () => {};

        rep1.addHandlers("*/*", {
            "GET": handler,
            "POST": handler,
            "PUT": handler,
            "PATCH": handler,
            "DELETE": handler
        });

        rep2.addHandlers("application/json", {
            "GET": handler,
            "POST": handler
        });

        const res = new Resource("foo");

        // Test one representation
        res.addRepresentations(rep1);
        let router = res.getExpressRouter();

        expect(router.stack).to.be.length(5);

        const methods = ["get", "post", "put", "patch", "delete"];
        router.stack.forEach((element, index) => {
            expect(element.route.path).to.equal("/foos/");
            expect(element.route.methods).to.have.property(methods[index], true);
        });

        // Add a second Representation
        res.addRepresentations(rep2);
        router = res.getExpressRouter();

        expect(router.stack).to.be.length(7);

        expect(router.stack[5].route.path).to.equal("/foos/:id");
        expect(router.stack[5].route.methods).to.have.property("get", true)

        expect(router.stack[6].route.path).to.equal("/foos/:id");
        expect(router.stack[6].route.methods).to.have.property("post", true)

    });

});