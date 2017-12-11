// Dependencies ---------------------------------------------------------------
import { Provider as CJProvider } from "../../Provider";
import { Interfaces } from "../../../../index";
import { Error } from "../../error";


// Collection+JSON error provider implementation ------------------------------
export class Provider extends CJProvider {
    getError(options: Interfaces.Options): Error {
        return new Error(options.title, options.code, options.message);
    }
}