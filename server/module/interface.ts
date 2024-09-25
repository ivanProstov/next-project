import { Method, ServicesName } from "./constants";
import { Request } from "express";

export interface IEndpointConfig<T> {
  method: Method;
  url: string;
  fn: keyof T;
}

export interface IServiceInRestAdapter<T> {
  init: () => Promise<IEndpointConfig<T>[]>;
  basePath: ServicesName;
  notAuthorized?: boolean;
}
