import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, isString } from 'class-validator';
import { ObjectId, Types } from 'mongoose';
import { RgtrCar } from 'src/registor/schemas/registor.schema';

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
  readonly dsc: string;
  @IsNumber()
  @IsNotEmpty()
  readonly reqStat: number;
  @IsArray()
  readonly vehicle: [string];

  @IsArray()
  readonly vehicles: RgtrCar;
}
