import { NextFunction, Request, Response } from 'express';
import { LoginUserDto } from '../../modules/user/dto/login-user.dto';
import { User } from '../../modules/user/user.entity';
import { HashService } from '../../modules/auth/services/hash.service';
import { UserService } from '../../modules/user/user.service';

const userServiceInstance = new UserService();
const hashServiceInstance = HashService.getInstance();

export async function localStrategy(
  req: Request<unknown, unknown, LoginUserDto>,
  res: Response,
  next: NextFunction
) {
  let user: User | null;
  if (req.body.email) {
    user = await userServiceInstance.findByEmail(req.body.email);
  } else if (req.body.login) {
    user = await userServiceInstance.findByLogin(req.body.login);
  } else {
    user = null;
  }
  if (!user) {
    req.session.errors = 'There is no user with such credentials';
    req.session.loginBody = req.body;
    return next();
  }
  const checkPassword = await hashServiceInstance.comparePasswords(
    req.body.password,
    user.password
  );
  if (!checkPassword) {
    req.session.errors = 'Wrong password';
    req.session.loginBody = req.body;
    return next();
  }
  req.session.user = user;
  return next();
}
