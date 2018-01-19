// Dependencies ---------------------------------------------------------------
import { Provider as CJProvider } from "../../index";
import { Error as CJError } from "../../error";

// Collection+JSON error provider implementation ------------------------------
export class Provider extends CJProvider {
    getError(options: {
        title: string,
        message: string
    }): CJError {
        return new CJError(options.title, options.message);
    }
}