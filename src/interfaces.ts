// Dependencies ---------------------------------------------------------------
import { Request, Response, NextFunction } from "express";

// Interface implementations --------------------------------------------------
// TODO: Rename this, as it doesn't represent a Tree but more of a Map of Routes
export interface RouteTree {
    [url: string]: Route
}

export interface Route {
    [method: string]: (req: Request, res: Response, next: NextFunction) => void
}

export interface CNMapping {
    [type: string]: (req: Request, res: Response, next: NextFunction) => void
}