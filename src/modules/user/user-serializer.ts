import { Exclude } from 'class-transformer';

export class UserSerializer {
  @Exclude()
  password: string;
}
