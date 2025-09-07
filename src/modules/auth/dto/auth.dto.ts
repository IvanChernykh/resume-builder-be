import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperties } from 'src/common/decorators/api-properties.decorator';

@ApiProperties()
export class RegisterUserDto {
  @IsString()
  @Length(4, 50)
  username: string;

  @IsString()
  @IsEmail()
  @Length(4, 128)
  email: string;

  @IsString()
  @Length(8, 60)
  password: string;
}

@ApiProperties()
export class LoginUserDto {
  @IsString()
  @IsEmail()
  @Length(4, 128)
  email: string;

  @IsString()
  @Length(8, 60)
  password: string;
}

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
