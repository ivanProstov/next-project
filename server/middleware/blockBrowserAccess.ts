import { Request, Response, NextFunction } from 'express';

export const blockBrowserAccess = (req: Request, res: Response, next: NextFunction) => {
    // TODO: в консоле появляется ошибка, потом разобраться в чем проблема
    const userAgent = req.headers['user-agent'];
    const customHeader = req.headers['x-custom-header'];
    if ( userAgent && userAgent.includes('Mozilla') && !customHeader) {
        return res.redirect("/404")
        // return res.status(403).json({ error: 'Access forbidden from browser' });
    }
};

