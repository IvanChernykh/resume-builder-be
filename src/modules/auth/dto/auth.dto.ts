import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(4, 50)
  username: string;

  @IsString()
  @IsEmail()
  @Length(4, 128)
  email: string;

  @IsString()
  @Length(8, 50)
  password: string;
}

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @Length(4, 128)
  email: string;

  @IsString()
  @Length(8, 50)
  password: string;
}
