import { IEndpointConfig, IServiceInRestAdapter } from "../interface";
import { Method, ServicesName } from "../constants";
import { Request, Response } from "express";
import { UsersService } from "../users/users.service";

export class AuthInRestAdapter
  implements IServiceInRestAdapter<AuthInRestAdapter>
{
  constructor(private readonly usersService: UsersService) {}

  public notAuthorized: boolean = true;
  public basePath = ServicesName.AUTH;

  public async init(): Promise<IEndpointConfig<AuthInRestAdapter>[]> {
    return [{ url: "registration", method: Method.POST, fn: "registration" }];
  }

  public async registration(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await this.usersService.createUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error registration" });
    }
  }
}
