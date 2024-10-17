import { Request, Response } from "express";
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
    const userId = req.session.userId;
    const user = await this.usersService.getUserById(userId as string);
    const users = await User.find({}, "_id name email");
    res.status(200).json({ userId: user?._id, name: user?.name, users });
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
      const { name, email, password, token } = req.body;
      const newUser = await this.usersService.createUser({
        name,
        email,
        password,
        token,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  }
}
