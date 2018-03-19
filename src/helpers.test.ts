import { expect } from "chai";
import "mocha";

import { sortAcceptHeader } from "./helpers";

describe("Test sortAcceptHeader Helper", () => {
    [{
        header: "text/*;q=0.3,text/html;q=0.7, text/html;level=1, text/html;level=2;q=0.4, */*;q=0.5",
        expected: ["text/html", "*/*", "text/*"]
    }, {
        header: "application/vnd.collection+json",
        expected: ["application/vnd.collection+json"]
    }, {
        header: "text/*, text/plain, text/plain;format=flowed, */*",
        expected: ["text/plain", "text/*", "*/*" ]
    }, {
        header: undefined,
        expected: ["*/*"]
    }].forEach(test => {

        it(`should order formats in the Accept header mostly according to RFC7231 Sec. 5.3.2., ignoring everything but the q parameter. (Accept: ${test.header})`, () => {
            expect(sortAcceptHeader(test.header)).to.deep.equal(test.expected);
        });

    });
} );
