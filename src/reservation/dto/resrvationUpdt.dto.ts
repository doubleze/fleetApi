import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RsvUpDto {
  readonly dts: string;

  readonly requster: string;

  readonly depmnt: string;

  readonly frm: string;

  readonly _to: string;

  readonly tm_frm: string;

  readonly tm_to: string;

  readonly dsc: string;

  readonly userName: string;

  readonly reqStat: number;

  readonly vehicle: string;
}
