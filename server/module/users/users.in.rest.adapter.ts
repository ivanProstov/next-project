import {Request, Response} from "express";
import {nameUsersInHeaders} from "../../../utils/constants";
import {IEndpointConfig, IServiceInRestAdapter} from "../interface";
import {Method, ServicesName} from "../constants";
import User from "../../models/users/users";



export class UsersInRestAdapter implements IServiceInRestAdapter<UsersInRestAdapter> {

    public basePath = ServicesName.USERS

    public async init(): Promise<IEndpointConfig<UsersInRestAdapter>[]> {
        return [
            {url: "get", method: Method.GET, fn: "getUsers"},
            {url: "create", method: Method.POST, fn: "createUser"}
        ];
    }

    public async getUsers(req: Request, res: Response) {
        const user = req.get(nameUsersInHeaders);
        const users =  await User.find();
        res.status(200).json({...JSON.parse(user || ""), method: "get", users});

    }

    public async createUser(req: Request, res: Response) {
        const user = req.get(nameUsersInHeaders)
        res.status(200).json({...JSON.parse(user || ""), method: "create"});
    }
}