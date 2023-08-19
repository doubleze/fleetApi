import { IsNotEmpty, IsNumber, IsString, isString } from 'class-validator';

export class RegCrsDto {
  @IsString()
  @IsNotEmpty()
  readonly platNo: string;
  @IsString()
  @IsNotEmpty()
  readonly driverName: string;
  @IsString()
  @IsNotEmpty()
  readonly model: string;
  @IsNumber()
  @IsNotEmpty()
  readonly capacity: number;
  @IsNumber()
  @IsNotEmpty()
  readonly carStat: number;
}