import { expect } from "chai";
import "mocha";

import { Resource, ResourceIdentifier } from "./index";

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

    it("should add a ResoureIdentifier when given one", () => {
        // Create a dummy ResourceIdentifier
        const rid = {} as ResourceIdentifier;

        const res = new Resource("foo");
        res.addIdentifiers(rid);

        expect(res.resourceIdentifiers).to.be.length(1).and.contain(rid);
    });

    it("should add multiple ResourceIdentifiers given in an array", () => {
        // Create dummy ResourceIdentifiers
        const rid1 = {} as ResourceIdentifier;
        const rid2 = {} as ResourceIdentifier;

        const res = new Resource("foo");
        res.addIdentifiers([rid1, rid2]);

        expect(res.resourceIdentifiers).to.be.length(2).and.contain(rid1).and.contain(rid2);
    });

    it("should return an express router containing all routes defined in the ResourceIdentifier", () => {
        // FIXME: This feels more like an integration test. Try to split it futher, mocking the used ResourceIdentifier instances.

        // Prepare two ResourceIdentifiers and a Resource
        const rid1 = new ResourceIdentifier("/", ["bar"]);
        const rid2 = new ResourceIdentifier("/:id", ["baz"]);

        const handler = () => {};

        rid1.addHandlers("*/*", {
            GET: handler,
            POST: handler,
            PUT: handler,
            PATCH: handler,
            DELETE: handler
        });

        rid2.addHandlers("application/json", {
            GET: handler,
            POST: handler
        });

        const res = new Resource("foo");

        // Test one ResourceIdentifier
        res.addIdentifiers(rid1);
        let router = res.getExpressRouter();

        expect(router.stack).to.be.length(5);

        const methods = ["get", "post", "put", "patch", "delete"];
        router.stack.forEach((element, index) => {
            expect(element.route.path).to.equal("/foos/");
            expect(element.route.methods).to.have.property(methods[index], true);
        });

        // Add a second ResourceIdentifier
        res.addIdentifiers(rid2);
        router = res.getExpressRouter();

        expect(router.stack).to.be.length(7);

        expect(router.stack[5].route.path).to.equal("/foos/:id");
        expect(router.stack[5].route.methods).to.have.property("get", true);

        expect(router.stack[6].route.path).to.equal("/foos/:id");
        expect(router.stack[6].route.methods).to.have.property("post", true);

    });

});
