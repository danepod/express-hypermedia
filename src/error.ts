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

export function middleware(err: RequestError, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500,
        message = err.message || "",
        error = req.app.get('env') === 'development' ? err.stack : {};

    res.status(status);

    const accepts = req.header('Accept') || "*/*";

    switch (accepts) {
        case "application/vnd.siren+json":
            res.json(new Siren.Entity(new Siren.ErrorProvider(), {
                status,
                message,
                error
            }));
            break;
        case "application/vnd.collection+json":
            res.json(new CJ.Collection(new CJ.StatusProvider(), {
                title: message,
                message: error
            }));
            break;
        default:
            res.json({
                status,
                message,
                error
            });
            break;
    }

    next(err);
}