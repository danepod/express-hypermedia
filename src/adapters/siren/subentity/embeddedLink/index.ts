import { Link } from "../../index";

export class EmbeddedLink extends Link {
    /**
     * Describes the nature of an entity's content based on the current 
     * representation. Possible values are implementation-dependent and should 
     * be documented.
     */
    class?: string[];
}