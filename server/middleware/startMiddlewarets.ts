import { NextFunction, Request, Response } from "express";

type IStartMiddlewaretsProps = (
  request: Request,
  res: Response,
  next: NextFunction,
) => void;

export const startMiddlewarets =
  (...Middlewarets: IStartMiddlewaretsProps[]) =>
  (request: Request, res: Response, next: NextFunction) => {
    Middlewarets.map((middleware) => middleware(request, res, next));
  };
