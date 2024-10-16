import { IEndpointConfig, IServiceInRestAdapter } from "../interface";
import { Method, ServicesName } from "../constants";
import { Request, Response } from "express";
import { UsersService } from "../users/users.service";
import { CryptoService } from "../crypto/crypto.service";
import { nameAccessToken } from "../../../utils/constants";
import { AuthService } from "./auth.service";

export class AuthInRestAdapter
  implements IServiceInRestAdapter<AuthInRestAdapter>
{
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    public readonly authService: AuthService,
  ) {}

  public notAuthorized: boolean = true;
  public basePath = ServicesName.AUTH;

  public async init(): Promise<IEndpointConfig<AuthInRestAdapter>[]> {
    return [
      { url: "registration", method: Method.POST, fn: "registration" },
      { url: "login", method: Method.POST, fn: "login" },
      { url: "logout", method: Method.POST, fn: "logout" },
      { url: "invite", method: Method.POST, fn: "invite" },
      { url: "checkVerifyToken", method: Method.GET, fn: "checkVerifyToken" },
      { url: "verify", method: Method.POST, fn: "verify" },
    ];
  }

  public async invite(req: Request<{ email: string }>, res: Response) {
    try {
      const { email } = req.body;
      await this.authService.invite(email);
      res.status(201).json(true);
    } catch (error) {
      res.status(500).json({ error: "Error invite" });
    }
  }

  public async checkVerifyToken(req: Request, res: Response) {
    // TODO: вынести в services, что бы избавиться от протечки бизнес логики
    try {
      const { token } = req.query;
      const { userId } = await this.authService.checkVerifyTokenOrError(
        token as string,
      );
      const user = await this.usersService.getUserByIdOrError(userId);
      if (user.token !== token) {
        res.status(200).json(false);
      }
      res.status(200).json(true);
    } catch {
      res.status(200).json(false);
    }
  }

  public async verify(req: Request, res: Response) {
    try {
      await this.authService.verify({ ...req.body, ...req.query });
      return res.status(200).json(true);
    } catch (e: any) {
      res.status(500).json({ error: e?.message });
    }
  }

  public async registration(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await this.usersService.createUser({
        name,
        email,
        password,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error registration" });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password, rememberMe } = req.body;
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

        req.session.userId = user._id;
        req.session.cookie.maxAge = rememberMe
          ? 7 * 24 * 60 * 60 * 1000
          : 60 * 60 * 1000; // Устанавливаем время жизни сессии

        return res.status(200).json({ message: "Login successful" });
      });
    } catch (error) {
      return res.status(500).json({ error: "authorization error" });
    }
  }
  public async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie(nameAccessToken); // Удаляем cookie сессии
      return res.status(200).json({ message: "Logout successful" });
    });
  }
}
