// Dependencies ---------------------------------------------------------------
import { Provider as CJProvider } from "../../Provider";
import { Interfaces } from "../../../../index";
import { Error as CJError } from "../../error";


// Collection+JSON error provider implementation ------------------------------
export class Provider extends CJProvider {
    getError(options: Interfaces.Options): CJError {
        return new CJError(options.title, options.message);
    }
}