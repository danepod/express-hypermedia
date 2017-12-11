// Dependencies ---------------------------------------------------------------
import { Provider as SirenProvider } from "../../Provider";
import { Interfaces } from "../../../../index";

// Siren error provider implementation ----------------------------------------
export class Provider extends SirenProvider {
    getClass() {
        return ['error'];
    }

    getProperties(options: Interfaces.Options) {
        return {
            status: options.status || 500,
            message: options.message || "",
            error: options.error
        }
    }
    
}