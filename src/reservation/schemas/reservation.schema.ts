import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

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
  tm_frm: string;

  @Prop()
  tm_to: string;

  @Prop()
  dsc: string;
  
  @Prop()
  userName: string;

  @Prop({ type: Number, required: false }) 
  reqStat: number | null;

  @Prop({ type: String, required: false }) 
  vehicle: string | null;

}

// export const RservationsSchema = SchemaFactory.createForClass(Rservations)

export type RservationDocument = Rservations & Document;
export const RservationsSchema = SchemaFactory.createForClass(Rservations);