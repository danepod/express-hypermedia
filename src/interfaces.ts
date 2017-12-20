// Dependencies ---------------------------------------------------------------
import { Handler } from "express";

// Interfaces and Type Aliases ------------------------------------------------
export interface Route {
    [method: string]: Handler
}

export interface Options {
    [option: string]: any
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';