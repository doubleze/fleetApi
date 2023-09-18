import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RsvDto {
  @IsString()
  @IsNotEmpty()
  readonly dts: string;
  @IsString()
  @IsNotEmpty()
  readonly requster: string;
  @IsString()
  @IsNotEmpty()
  readonly depmnt: string;
  @IsString()
  @IsNotEmpty()
  readonly frm: string;
  @IsString()
  @IsNotEmpty()
  readonly _to: string;
  @IsString()
  @IsNotEmpty()
  readonly tm_frm: string;
  @IsString()
  @IsNotEmpty()
  readonly tm_to: string;
  @IsString()
  @IsNotEmpty()
  readonly dsc: string; //
  @IsString()
  @IsNotEmpty()
  userName: string;

  
  readonly reqStat: number;
  
  readonly vehicle: string;
}
