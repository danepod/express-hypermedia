// Dependencies ---------------------------------------------------------------
import { Request, Response, NextFunction } from "express";

// Provider class declaration -------------------------------------------------
export abstract class Provider {
    abstract contentType: string;
    abstract handler: (req: Request, res: Response, next: NextFunction) => void;

    getHandler(): (req: Request, res: Response, next: NextFunction) => void {
        return this.handler;
    }
}