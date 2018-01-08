// Dependencies ---------------------------------------------------------------
import { Provider as SirenProvider } from "../../Provider";

// Siren status provider implementation ----------------------------------------
export class Provider extends SirenProvider {
    getClass() {
        return ['status'];
    }

    getProperties(options: {message: string}) {
        return {
            message: options.message || ""
        }
    }
    
}