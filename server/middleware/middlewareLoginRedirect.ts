import { Path } from "../../utils/router-config/routes";
import { NextFunction, Request, Response } from "express";
import { loginUrl, registrationUrl } from "../../utils/constants";

export function middlewareLoginRedirect(
  request: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = request.session?.userId;
  if (request.path === loginUrl || request.path === registrationUrl) {
    if (accessToken) {
      return res.redirect(Path.HOME);
    }
  }
}
