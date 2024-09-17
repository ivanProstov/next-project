import { Path } from "../../utils/router-config/routes";
import { NextFunction, Request, Response } from "express";
import { nameAccessToken } from "../../utils/constants";

export function middlewareLoginRedirect(
  request: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = request.cookies[nameAccessToken];
  if (request.path === "/login") {
    if (accessToken) {
      return res.redirect(Path.HOME);
    }
  }
}
