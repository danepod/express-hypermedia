// Dependencies ---------------------------------------------------------------
import { Provider as SirenProvider } from "../../Provider";
import { Interfaces } from "../../../../index";

// Siren status provider implementation ----------------------------------------
export class Provider extends SirenProvider {
    getClass() {
        return ['status'];
    }

    getProperties(options: Interfaces.Options) {
        return {
            message: options.message || ""
        }
    }
    
}