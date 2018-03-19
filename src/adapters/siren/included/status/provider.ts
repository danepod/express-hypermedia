// Dependencies ---------------------------------------------------------------
import { Provider as SirenProvider } from "../../Provider";

// Siren status provider implementation ---------------------------------------
/**
 * Provider that generates general purpose status messages
 */
export class Provider extends SirenProvider {
    /**
     * Set the class of the status message Entity to 'status'
     */
    getClass() {
        return ["status"];
    }

    /**
     * Set the properties of the status message Entity
     * @param options Object containing a message to create a status Entity
     */
    getProperties(options: { message: string }) {
        return {
            message: options.message || ""
        };
    }

}
