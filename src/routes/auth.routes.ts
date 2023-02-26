import { Router } from 'express';
import { AuthController } from '../modules/auth/auth.controller';
import { CreateUserDto } from '../modules/user/dto/create-user.dto';
import { LoginUserDto } from '../modules/user/dto/login-user.dto';
import { jwtStrategy } from '../middlewares/auth/jwt-strategy';
import { localStrategy } from '../middlewares/auth/local-strategy';
import { bodyValidator } from '../middlewares/body-validator';

export const authRouter = Router();
const authController = new AuthController();

authRouter
  .get('/registration', authController.getRegistrationPage.bind(authController))
  .get('/login', authController.getLoginPage)
  .get('/get-user', jwtStrategy, authController.getUser)
  .post(
    '/registration',
    bodyValidator(CreateUserDto),
    authController.registration.bind(authController)
  )
  .post(
    '/login',
    bodyValidator(LoginUserDto),
    localStrategy,
    authController.login.bind(authController)
  )
  .use('/logout', authController.logout);
