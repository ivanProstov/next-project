import { UsersInRestAdapter } from "./users/users.in.rest.adapter";
import { Express } from "express";
import { IServiceInRestAdapter } from "@/server/module/interface";
import { authorizedPath } from "../../utils/constants";
import { AuthInRestAdapter } from "./auth/auth.in.rest.adapter";

const usersInRestAdapter = new UsersInRestAdapter();
const authInRestAdapter = new AuthInRestAdapter(usersInRestAdapter);

const serviceAdapters: IServiceInRestAdapter<any>[] = [
  usersInRestAdapter,
  authInRestAdapter,
];

export const initializeEndpoints =
  (services: IServiceInRestAdapter<any>[]) => (server: Express) => {
    // console.log("services >>> ", services);
    services.map(async (service) => {
      const init = await service.init();
      // console.log("service >>> ", service);
      const isAuthorized = !service.notAuthorized ? `${authorizedPath}/` : "";

      const baseUrl = `/api/${isAuthorized}${service.basePath}/`;

      return init.map((elem) => {
        // console.log("`${baseUrl}${elem.url}` >>> ", `${baseUrl}${elem.url}`);
        // @ts-ignore
        server[elem.method](`${baseUrl}${elem.url}`, service[elem.fn]);
      });
    });
  };

export const setupServer = initializeEndpoints(serviceAdapters);
