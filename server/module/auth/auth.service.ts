import { UsersService } from "@/server/module/users/users.service";
import { CryptoService } from "@/server/module/crypto/crypto.service";
import { MailerService } from "@/server/module/mailer/mailer.service";
import { JwtService } from "@/server/module/jwt/jwt.service";

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

  // TODO: перенести метод в класс mailerService
  private getHtml(token: string) {
    return `<div><a href="http://localhost:3000/verify?token=${token}">Registration</a></div>`;
  }
}
