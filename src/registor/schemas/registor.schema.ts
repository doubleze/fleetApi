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
    carStat: number;
    // defualt: 1;
    

}

export const RgtrCarSchema = SchemaFactory.createForClass(RgtrCar)