import {UsersInRestAdapter} from "./users/users.in.rest.adapter";
import {Express} from "express";
import {IServiceInRestAdapter} from "@/server/module/interface";


const serviceAdapters: IServiceInRestAdapter<any>[] = [new UsersInRestAdapter()]

export const initializeEndpoints = (services: IServiceInRestAdapter<any>[]) =>  (server: Express) => {
    services.map(async (service) => {
       const init = await service.init();
       const baseUrl = `/api/${service.basePath}/`
       return init.map((elem) => {
            // @ts-ignore
            server[elem.method](`${baseUrl}${elem.url}`, service[elem.fn])
        })

    })
}


export const setupServer = initializeEndpoints (serviceAdapters)