import { IEndpointConfig, IServiceInRestAdapter } from "../interface";
import { Method, ServicesName } from "../constants";
import { Request, Response } from "express";
import { UsersService } from "../users/users.service";
import { CryptoService } from "../crypto/crypto.service";

export class AuthInRestAdapter
  implements IServiceInRestAdapter<AuthInRestAdapter>
{
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
  ) {}

  public notAuthorized: boolean = true;
  public basePath = ServicesName.AUTH;

  public async init(): Promise<IEndpointConfig<AuthInRestAdapter>[]> {
    return [
      { url: "registration", method: Method.POST, fn: "registration" },
      { url: "login", method: Method.POST, fn: "login" },
    ];
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

  public async login(req: Request, res: Response) {
    try {
      const { email, password, isRememberMe } = req.body;
      const user = await this.usersService.getUserByEmailOrError(email);
      const isCheckPassword = await this.cryptoService.checkPassword(
        password,
        user.password,
      );
      if (!isCheckPassword) {
        throw new Error("User already exists");
      }
      req.session.regenerate((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Session regeneration failed" });
        }
        // @ts-ignore
        req.session.userId = user._id;
        req.session.cookie.maxAge = isRememberMe
          ? 7 * 24 * 60 * 60 * 1000
          : 60 * 60 * 1000; // Устанавливаем время жизни сессии

        console.log("req.session222 >>> ", req.session);
        return res.status(200).json({ message: "Login successful" });
      });
    } catch (error) {
      return res.status(500).json({ error: "authorization error" });
    }
  }
}
