import { IsNotEmpty, IsString } from 'class-validator';

export class logInDto {
  @IsString()
  @IsNotEmpty()
  readonly userName: string;
  @IsString()
  @IsNotEmpty()
  readonly passWord: string;
}
