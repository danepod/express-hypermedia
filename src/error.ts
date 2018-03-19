// Dependencies ---------------------------------------------------------------
import { NextFunction, Request, Response } from "express";

import { sortAcceptHeader } from "./helpers";
import { Provider } from "./Provider";

// Error implementations ------------------------------------------------------
/**
 * Error resulting from the execution of an incoming HTTP request.
 */
export class RequestError extends Error {
    /** HTTP status code */
    status: number;

    /**
     * Creates a new Error resulting from the execution of an incoming HTTP request.
     * @param message Human-readable message describing the error
     * @param status HTTP status code describing the error. Default: 500 (Internal Server Error)
     */
    constructor(message: string, status: number = 500) {
        super(message);

        this.status = status;
    }
}

/**
 * Type describing a function that returns the serializable representation of a RequestError.
 */
export type errorHandlerFunction = (status: number, message: string, error: string | undefined) => Provider | object | string;

/**
 * Function returning an error middleware using the given handlers for error responses.
 *
 * Example: `errorMiddleware({ "text/plain": (status, message, error) => "Error: " + message })`
 * @param handlers Object containing any additional error handlers to be used to generate an error message. The object is indexed by the MIME-type that shall be handled. Any handler function may return an object (which will get JSON serialized in the response) or string. Not using this parameter will result in all error messages getting serialized in a default JSON object.
 * @returns Express middleware function
 */
export function errorMiddleware(handlers?: {
    [format: string]: errorHandlerFunction
}) {

    const errorHandlers: {
        [format: string]: errorHandlerFunction
    } = {
        default: (status, message, error) => {
            return {
                status,
                message,
                error
            };
        }
    };

    handlers = handlers || {};

    for (const format in handlers) {
        if (handlers.hasOwnProperty(format)) {
            const handler = handlers[format];

            errorHandlers[format] = handler;
        }
    }

    return (err: RequestError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message || "";
        const error = req.app.get("env") === "development" ? err.stack : "";

        res.status(status);

        const accepts = sortAcceptHeader(req.header("Accept"));

        // Search the accept header for supported formats
        const formatMatch = accepts.find(format => {
            return errorHandlers[format] !== undefined;
        });

        let response: object | string;

        if (formatMatch) {
            response = errorHandlers[formatMatch](status, message, error);
        } else {
            response = errorHandlers.default(status, message, error);
        }

        if (typeof response === "string") {
            res.send(response);
        } else {
            res.json(response);
        }

        next(err);
    };
}
