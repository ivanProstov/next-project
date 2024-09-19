import bcrypt from "bcrypt";

export class CryptoService {
  private secretKey = "84377bf1354f737b10f";
  private saltRounds = 10;

  public async hashPassword(password: string): Promise<string> {
    const pepperedPassword = password + this.secretKey;
    return await bcrypt.hash(pepperedPassword, this.saltRounds);
  }

  public async checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const pepperedPassword = password + this.secretKey;
    return await bcrypt.compare(pepperedPassword, hashedPassword);
  }
}
