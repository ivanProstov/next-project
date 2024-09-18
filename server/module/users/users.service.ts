import User from "../../models/users/users";

export class UsersService {
  public async createUser(name: string, email: string, password: string) {
    const newUser = new User({ name, email, password });
    await newUser.save();
    return newUser;
  }
}
