import {NextFunction, Request, Response} from "express";

export const middlewareAuthAPI = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    console.log("accessToken >>> ", accessToken)
    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // если middlewareAuthAPI идет последним, то нужно next()
    // TODO: нужно разобраться почему так рабоатет
    // next()
}