import { IsNotEmpty, IsNumber, IsString, isString } from 'class-validator';

export class UpdtCrsDto {
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
  @IsString()
  @IsNotEmpty()
  readonly dirverPhone: string;
  @IsNumber()
  @IsNotEmpty()
  readonly carStat: number;

  @IsString()
  @IsNotEmpty()
  readonly tm_frm: string;
  @IsString()
  @IsNotEmpty()
  readonly tm_to: string;
}
