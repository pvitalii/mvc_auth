import jwt from 'jsonwebtoken';
import { User } from '../modules/user/user.entity';

export interface JwtPayload extends jwt.JwtPayload, Omit<User, 'password'> {}
