// Dependencies ---------------------------------------------------------------
import { Entity } from "./Entity";

// Provider class declaration -------------------------------------------------
export abstract class Provider {
    abstract entity: Entity;

    toJSON(): Entity {
        return this.entity.toJSON();
    }
}