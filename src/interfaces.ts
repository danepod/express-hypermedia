// Dependencies ---------------------------------------------------------------
import { Handler } from "express";

// Interfaces and Type Aliases ------------------------------------------------
export interface Route {
    [method: string]: Handler
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';