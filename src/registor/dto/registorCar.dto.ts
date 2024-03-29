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
  @IsString()
  @IsNotEmpty()
  readonly dirverPhone: string;
  
  
  readonly carStat: number;
  
  readonly tm_frm: string;
 
  readonly tm_to: string;
}