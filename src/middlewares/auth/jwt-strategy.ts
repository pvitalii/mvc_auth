import { NextFunction, Response, Request } from 'express';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { TokenService } from '../../modules/auth/services/token.service';
import { UserService } from '../../modules/user/user.service';

const userServiceInstance = new UserService();
const tokenServiceInstance = TokenService.getInstance();

export async function jwtStrategy(req: Request, res: Response, next: NextFunction) {
  try {
    const verifiedToken = (await tokenServiceInstance.verifyAccessToken(
      req.cookies.accessToken
    )) as JwtPayload;
    const user = await userServiceInstance.findById(verifiedToken.id);
    if (!user) {
      req.session.errors = 'Unauthorized';
      return next();
    }
    req.session.user = user;
    return next();
  } catch {
    req.session.errors = "You don't have an access, log in or sign up for it";
    return next();
  }
}
