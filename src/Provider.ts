// Dependencies ---------------------------------------------------------------
import { Handler } from "express";

// Provider class declaration -------------------------------------------------
export abstract class Provider {
    abstract contentType: string;
    abstract handler: Handler;
}