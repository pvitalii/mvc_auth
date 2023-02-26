import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { UserService } from '../../user.service';

@ValidatorConstraint({ name: 'IsEmailUnique', async: false })
export class EmailUnique implements ValidatorConstraintInterface {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async validate(email: string, args: ValidationArguments) {
    const user = await this.userService.findByEmail(email);
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'email must be unique';
  }
}
