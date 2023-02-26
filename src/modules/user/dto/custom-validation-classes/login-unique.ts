import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { UserService } from '../../user.service';

@ValidatorConstraint({ name: 'IsLoginUnique', async: false })
export class LoginUnique implements ValidatorConstraintInterface {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async validate(login: string, args: ValidationArguments) {
    const user = await this.userService.findByLogin(login);
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'login must be unique';
  }
}
