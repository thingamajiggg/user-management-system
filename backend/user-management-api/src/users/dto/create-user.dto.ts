import { IsEmail, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}