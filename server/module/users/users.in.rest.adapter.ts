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
      { url: "get", method: Method.GET, fn: "getUser" },
      { url: "create", method: Method.POST, fn: "createUser" },
      { url: "getUsers", method: Method.GET, fn: "getUsers" },
    ];
  }

  public getUsers = async (req: Request, res: Response) => {
    const user = req.get(nameUsersInHeaders);
    const users = await User.find();
    res.status(200).json({ ...JSON.parse(user || ""), method: "get", users });
  };

  public getUser = async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId;
      const user = await this.usersService.getUserByIdOrError(userId || "");
      res.status(200).json(user);
    } catch {
      res.status(401).json({ message: "Not authenticated" });
    }
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

  // public async getSession(req: Request, res: Response) {
  //   if (req.session.userId) {
  //     const user = await this.usersService.getUserByIdOrError(
  //       req.session.userId,
  //     );
  //     res.status(200).json(user);
  //   } else {
  //     res.status(401).json({ message: "Not authenticated" });
  //   }
  // }
}
