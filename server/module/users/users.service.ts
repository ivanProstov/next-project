import User from "../../models/users/users";
import { CryptoService } from "../crypto/crypto.service";
import { IUser } from "../../models/users/interface";

export class UsersService {
  constructor(private cryptoService: CryptoService) {}

  public async createUser({
    name,
    email,
    password,
    token,
  }: {
    name?: string;
    email: string;
    password: string;
    token?: string;
  }) {
    const cryptoPassword = await this.cryptoService.hashPassword(password);
    const newUser = new User({ name, email, password: cryptoPassword, token });
    await newUser.save();
    return newUser;
  }

  public async updateUser({
    id,
    ...data
  }: {
    id: string;
    name?: string;
    email: string;
    password: string;
    token?: string;
  }) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }

  public async getUserById(id: string): Promise<IUser | null> {
    return User.findOne({ _id: id });
  }

  public async getUserByIdOrError(id: string): Promise<IUser> {
    const user = await User.findOne({ _id: id });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  public async getUserByEmailOrError(email: string): Promise<IUser> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
