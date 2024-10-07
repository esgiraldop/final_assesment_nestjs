import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto extends PartialType(RegisterUserDto) {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
