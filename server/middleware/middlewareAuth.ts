import { routes } from "../../utils/router-config/routes";
import { NextFunction, Request, Response } from "express";
import { loginUrl } from "../../utils/constants";

export function middlewareAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // TODO: добавить проверку на истечение сессии
  const accessToken = req.session.userId;
  const isAuthenticated = checkAuth(req, accessToken);
  if (!isAuthenticated) {
    return res.redirect(loginUrl);
  }
}

// Функция для проверки аутентификации
function checkAuth(request: Request, token?: string | undefined) {
  const publicPaths = routes.map(({ path }) => path);
  // Ваша логика проверки аутентификации
  if (publicPaths.includes(request.path) && !token) {
    return false;
  }
  return true;
}
