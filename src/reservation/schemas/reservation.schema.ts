import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { RgtrCar, RgtrCarSchema } from 'src/registor/schemas/registor.schema';

@Schema({
  timestamps: true,
})
export class Rservations {
  @Prop()
  dts: string;

  @Prop()
  requster: string;

  @Prop()
  depmnt: string;

  @Prop()
  frm: string;

  @Prop()
  _to: string;

  @Prop()
  dsc: string;

  @Prop()
  reqStat: number;

@Prop()
vehicle: [string];

@Prop({ type: RgtrCarSchema })
vehicles: RgtrCar;

}

export const RservationsSchema = SchemaFactory.createForClass(Rservations)