import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UsersDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  readonly departmnt: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly userName: string;
  @IsString()
  @IsNotEmpty()
  readonly passWord: string;
  @IsNumber()
  @IsNotEmpty()
  readonly userRole: number;
}
