import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsBoolean,
  IsNumber,
  MinLength,
  MaxLength,
  IsDateString,
  Validate
} from 'class-validator';
import { Country } from '../../country/country.entity';
import { EmailUnique } from './custom-validation-classes/email-unique';
import { LoginUnique } from './custom-validation-classes/login-unique';

export class CreateUserDto {
  @IsEmail()
  @Validate(EmailUnique)
  email: string;

  @IsString()
  @Validate(LoginUnique)
  login: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsString()
  real_name: string;

  @IsDateString()
  birth_date: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  countryId: number;

  country?: Country;

  @Transform(({ value }) => value === 'on')
  @IsBoolean()
  agree_with_terms_and_conditions: boolean;
}
