import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../../user/user.entity';
import { JwtPayload } from '../../../interfaces/jwt-payload.interface';

export class TokenService {
  private static instance: TokenService;
  private access_token_sign_options: SignOptions = {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION!
  };

  async generateAccessToken(payload: JwtPayload): Promise<string> {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, this.access_token_sign_options);
  }

  async verifyAccessToken(token: string): Promise<string | jwt.JwtPayload> {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  }

  async generateAccessTokenForUser(user: User): Promise<string> {
    const { password, ...rest } = user;
    return this.generateAccessToken(rest);
  }

  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }
}
