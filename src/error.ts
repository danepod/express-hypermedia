// Dependencies ---------------------------------------------------------------
import { Request, Response, NextFunction } from "express";
import { Siren, CJ } from "./index";

// Error implementations ------------------------------------------------------
export class RequestError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);

        this.status = status || 500;
    }
}

export function errorMiddleware(err: RequestError, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500,
        message = err.message || "",
        error = req.app.get('env') === 'development' ? err.stack : {};

    const errorHandlers: {
        [method: string]: Function
    } = {
        "application/vnd.siren+json": () => {
            res.json(new Siren.ErrorProvider({
                status,
                message,
                error
            }));
        },
        "application/vnd.collection+json": () => {
            res.json(new CJ.StatusProvider({
                title: message,
                message: error
            }));
        },
        "default": () => {
            res.json({
                status,
                message,
                error
            });
        }
    };

    res.status(status);


    const acceptHeader = req.header('Accept');
    const accepts = ((acceptHeader !== undefined) ? acceptHeader.replace(' ', '').split(',') : ['*/*']);

    // Search the accept header for supported formats
    const formatMatch = accepts.find(format => {
        return errorHandlers[format] !== undefined;
    });

    if (formatMatch) {
        errorHandlers[formatMatch]();
    } else {
        errorHandlers['default']();
    }

    next(err);
}