import { nameUsersInHeaders } from "../../utils/constants";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { routes } from "../../utils/router-config/routes";
import { NextFunction, Request, Response } from "express";

export function middlewareAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // @ts-ignore
  const accessToken = req.session.userId;

  const isAuthenticated = checkAuth(req, accessToken); // Ваша логика проверки аутентификации
  if (!isAuthenticated) {
    return res.redirect("/login");
  }
  const userInfo = JSON.stringify({ id: accessToken, user: "ivolkov" });
  req.headers[nameUsersInHeaders] = userInfo;
  res.setHeader(nameUsersInHeaders, userInfo);
}

// Функция для проверки аутентификации
function checkAuth(request: Request, token: RequestCookie | undefined) {
  const publicPaths = routes.map(({ path }) => path);
  // Ваша логика проверки аутентификации
  if (publicPaths.includes(request.path) && !token) {
    return false;
  }
  return true;
}
