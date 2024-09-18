import { Request, Response } from "express";
import { nameUsersInHeaders } from "../../../utils/constants";
import { IEndpointConfig, IServiceInRestAdapter } from "../interface";
import { Method, ServicesName } from "../constants";
import User from "../../models/users/users";
import { UsersService } from "./users.service";

export class UsersInRestAdapter
  implements IServiceInRestAdapter<UsersInRestAdapter>
{
  constructor(private readonly usersService: UsersService) {}

  public basePath = ServicesName.USERS;

  public async init(): Promise<IEndpointConfig<UsersInRestAdapter>[]> {
    return [
      { url: "get", method: Method.GET, fn: "getUsers" },
      { url: "create", method: Method.POST, fn: "createUser" },
    ];
  }

  public getUsers = async (req: Request, res: Response) => {
    const user = req.get(nameUsersInHeaders);
    const users = await User.find();
    res.status(200).json({ ...JSON.parse(user || ""), method: "get", users });
  };

  public async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const newUser = await this.usersService.createUser(name, email, password);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  }
}
