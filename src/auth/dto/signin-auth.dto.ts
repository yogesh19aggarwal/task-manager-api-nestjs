/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString } from 'class-validator';

export class SignInAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
