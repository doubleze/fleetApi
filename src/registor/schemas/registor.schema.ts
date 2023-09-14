import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true
})
export class RgtrCar{

    @Prop()
    platNo: string;

    @Prop()
    driverName: string;

    @Prop()
    model: string;

    @Prop()
    capacity: number; 
    
    @Prop()
    dirverPhone:string;

    @Prop()
    carStat: number;
    
    @Prop()
    tm_frm: string;
  
    @Prop()
    tm_to: string;


}

export const RgtrCarSchema = SchemaFactory.createForClass(RgtrCar)