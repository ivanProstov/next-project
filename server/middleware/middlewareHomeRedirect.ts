import {Path} from "../../utils/router-config/routes";
import {NextFunction, Request, Response} from "express";

export function middlewareHomeRedirect(request: Request, res: Response, next: NextFunction) {
    if (request.path === '/') {
        return res.redirect(Path.HOME)
    }
    return next();
}