// Dependencies ---------------------------------------------------------------
import { Handler } from "express";

// Interfaces and Type Aliases ------------------------------------------------
// TODO: Rename this, as it doesn't represent a Tree but more of a Map of Routes
export interface RouteMap {
    [url: string]: Route
}

export interface Route {
    [method: string]: Handler
}

export interface CNMapping {
    [type: string]: Handler
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';