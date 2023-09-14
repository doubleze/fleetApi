import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Users {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  departmnt: string;

  @Prop({unique: true})
  email: string;

  @Prop({unique: true})
  userName: string; 

  @Prop()
  passWord: string;

  @Prop()
  userRole: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users)