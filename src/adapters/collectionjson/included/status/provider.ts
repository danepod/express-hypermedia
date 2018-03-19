// Dependencies ---------------------------------------------------------------
import * as CJ from "../../index";

// Collection+JSON error provider implementation ------------------------------
/**
 * Provider that generates error messages formatted for Collection+JSON clients
 */
export class Provider extends CJ.Provider {
    /**
     * Set the error object of the collection
     * @param options Obejct containing all data to create an error message
     */
    getError(options: {
        title: string,
        message: string
    }): CJ.Error {
        return new CJ.Error(options.title, options.message);
    }
}
