// Dependencies ---------------------------------------------------------------
import { Provider as SirenProvider } from "../../Provider";

// Siren error provider implementation ----------------------------------------
/**
 * Provider that generates error messages formatted for Siren clients
 */
export class Provider extends SirenProvider {
    /**
     * Set the class of the error message Entity to 'error'
     */
    getClass() {
        return ['error'];
    }

    /**
     * Set the properties of the error message Entity
     * @param options Object containing all data to create an error message
     */
    getProperties(options: {
        status: number,
        message: string,
        error: string
    }) {
        return {
            status: options.status || 500,
            message: options.message || "",
            error: options.error
        }
    }
    
}