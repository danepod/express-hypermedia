// Dependencies ---------------------------------------------------------------
import { Provider as SirenProvider } from "../../Provider";

// Siren error provider implementation ----------------------------------------
export class Provider extends SirenProvider {
    getClass() {
        return ['error'];
    }

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