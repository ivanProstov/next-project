import { UsersService } from "@/server/module/users/users.service";
import { CryptoService } from "@/server/module/crypto/crypto.service";
import { MailerService } from "@/server/module/mailer/mailer.service";
import { JwtService } from "@/server/module/jwt/jwt.service";
import { loginUrl, verifyUrl } from "../../../utils/constants";

export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly mailerService: MailerService,
    private readonly jwt: JwtService,
  ) {}

  public async invite(email: string) {
    const password = await this.cryptoService.hashPassword(
      `${email}${Date.now()}`,
    );
    const { _id, ...user } = await this.usersService.createUser({
      password,
      email,
    });

    const token = this.jwt.sign({ userId: _id });

    // TODO: разобраться как передать весь user
    await this.usersService.updateUser({
      id: _id,
      email: user.email,
      password: user.password,
      token,
    });

    await this.mailerService.send(email, {
      subject: "invite next-project",
      html: this.getHtml(token),
    });
    return user;
  }

  public async checkVerifyTokenOrError(
    token: string,
  ): Promise<{ userId: string }> {
    try {
      return this.jwt.verify(token);
    } catch (e) {
      throw new Error("Invalid or expired toket");
    }
  }

  public async verify({
    token,
    password,
    name,
  }: {
    token: string;
    name: string;
    password: string;
  }) {
    try {
      const { userId } = await this.checkVerifyTokenOrError(token);
      const currentUser = await this.usersService.getUserByIdOrError(userId);
      const cryptoPassword = await this.cryptoService.hashPassword(password);
      const updateUserData = {
        id: userId,
        email: currentUser.email,
        password: cryptoPassword,
        name: name,
        token: undefined,
      };
      return await this.usersService.updateUser(updateUserData);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  // res.redirect(Path.HOME);
  public async verifyAndRedirect(
    value: {
      token: string;
      name: string;
      password: string;
    },
    redirect: (url: string) => void,
    // preRedirect: () => Promise<boolean>,
  ) {
    try {
      await this.verify(value);
      // await preRedirect();
      redirect(loginUrl);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  // TODO: перенести метод в класс mailerService
  private getHtml(token: string) {
    return `<div><a href="http://localhost:${process.env.PORT}${verifyUrl}?token=${token}">Registration</a></div>`;
  }
}
