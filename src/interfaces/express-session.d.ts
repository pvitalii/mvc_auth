import 'express-session';
import { CreateUserDto } from '../modules/user/dto/create-user.dto';
import { LoginUserDto } from '../modules/user/dto/login-user.dto';
import { User } from '../modules/user/user.entity';

declare module 'express-session' {
  interface SessionData {
    errors: string | string[];
    registerBody: CreateUserDto;
    loginBody: LoginUserDto;
    user: User;
  }
}
