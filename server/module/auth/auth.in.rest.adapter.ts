import { IEndpointConfig, IServiceInRestAdapter } from "../interface";
import { Method, ServicesName } from "../constants";
import { Request, Response } from "express";
import User from "../../models/users/users";
import { UsersInRestAdapter } from "../users/users.in.rest.adapter";

export class AuthInRestAdapter
  implements IServiceInRestAdapter<AuthInRestAdapter>
{
  constructor(private readonly usersInRestAdapter: UsersInRestAdapter) {}

  public notAuthorized: boolean = true;
  public basePath = ServicesName.AUTH;

  public async init(): Promise<IEndpointConfig<AuthInRestAdapter>[]> {
    return [{ url: "registration", method: Method.POST, fn: "registration" }];
  }

  public async registration(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({ name, email, password });

      await newUser.save();
      res.status(201).json(newUser);
      return newUser;
    } catch (error) {
      res.status(500).json({ error: "Error registration" });
    }
  }
}
