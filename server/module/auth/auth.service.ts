import { UsersService } from "@/server/module/users/users.service";
import { CryptoService } from "@/server/module/crypto/crypto.service";

export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
  ) {}

  public async invite(email: string) {
    // todo: поправить
    // todo: добавить генерацию токена
    const password = await this.cryptoService.hashPassword(
      `${email}${Date.now()}`,
    );
    return await this.usersService.createUser({
      password,
      email,
      token: "testToken",
    });
  }
}
