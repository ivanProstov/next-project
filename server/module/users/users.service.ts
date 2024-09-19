import User from "../../models/users/users";
import { CryptoService } from "../crypto/crypto.service";

export class UsersService {
  constructor(private cryptoService: CryptoService) {}

  public async createUser(name: string, email: string, password: string) {
    const cryptoPassword = await this.cryptoService.hashPassword(password);
    const newUser = new User({ name, email, password: cryptoPassword });
    await newUser.save();
    return newUser;
  }
}
