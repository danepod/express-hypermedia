// Dependencies ---------------------------------------------------------------
import { Request, Response, NextFunction } from "express";
import { sortAcceptHeader } from "./helpers";
import { Provider } from "./Provider";

// Error implementations ------------------------------------------------------
export class RequestError extends Error {
    status: number;

    constructor(message: string, status?: number) {
        super(message);

        this.status = status || 500;
    }
}

export type errorHandlerFunction = (status: number, message: string, error: string | undefined) => Provider | Object | string

export function errorMiddleware(handlers?: {
    [format: string]: errorHandlerFunction
}) {

    const errorHandlers: {
        [format: string]: errorHandlerFunction
    } = {
        "default": (status, message, error) => {
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
        const status = err.status || 500,
              message = err.message || "",
              error = req.app.get('env') === 'development' ? err.stack : "";

        res.status(status);

        const accepts = sortAcceptHeader(req.header("Accept") || "*/*");

        // Search the accept header for supported formats
        const formatMatch = accepts.find(format => {
            return errorHandlers[format] !== undefined;
        });

        let response: Object | string;

        if (formatMatch) {
            response = errorHandlers[formatMatch](status, message, error);
        } else {
            response = errorHandlers["default"](status, message, error);
        }

        if(typeof response === "string") {
            res.send(response);
        } else {
            res.json(response);
        }

        next(err);
    };
}