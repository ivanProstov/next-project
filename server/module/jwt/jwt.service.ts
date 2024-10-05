const jwt = require("jsonwebtoken");

export class JwtService {
  public sign(data: Record<string, unknown>) {
    return jwt.sign(data, process.env.JWT_SECRET_KEY, {
      expiresIn: "9h",
    });
  }

  public verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  }
}
