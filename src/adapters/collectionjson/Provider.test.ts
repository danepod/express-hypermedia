// tslint:disable:no-unused-expression
import { expect } from "chai";
import "mocha";

// Don't import directly from ./Provider! This crashes the tests for some reason...
import { Provider } from "./index";

class TestProvider1 extends Provider {}

class TestProvider2 extends Provider {
    getVersion(options?: {
        version: number
    }) {
        return options ? options.version : 1.0;
    }
}

describe("Test Collection+JSON Provider", () => {

    it("should instatiate a TestProvider, no options and automatically generating an entity", () => {
        const test = new TestProvider1();

        expect(test.entity.version).to.equal(1.0);
        expect(test.entity.href).to.be.undefined;
        expect(test.entity.links).to.be.undefined;
        expect(test.entity.items).to.be.undefined;
        expect(test.entity.queries).to.be.undefined;
        expect(test.entity.template).to.be.undefined;
        expect(test.entity.error).to.be.undefined;
    });

    it("should instatiate a TestProvider, given an options object and automatically generating an entity", () => {
        const test = new TestProvider2({ version: 2.0 });

        expect(test.entity.version).to.equal(2.0);
        expect(test.entity.href).to.be.undefined;
        expect(test.entity.links).to.be.undefined;
        expect(test.entity.items).to.be.undefined;
        expect(test.entity.queries).to.be.undefined;
        expect(test.entity.template).to.be.undefined;
        expect(test.entity.error).to.be.undefined;
    });

    it("should instantiate a TestProvider, given an options object and not automatically generating an entity", () => {
        const test = new TestProvider1({ version: 2.0 }, false);

        expect(test.entity).to.be.undefined;
    });

});
