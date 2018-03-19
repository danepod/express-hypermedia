import { Link } from "../../index";

/**
 * A type of Link that can be embedded as a Sub-Entity inside another Entity
 */
export class EmbeddedLink extends Link {
    /**
     * Describes the nature of an entity's content based on the current
     * representation. Possible values are implementation-dependent and should
     * be documented.
     */
    class?: string[];
}
