import { Module } from '@nestjs/common';
import { RegistorController } from './registor.controller';
import { RegistorService } from './registor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RgtrCar, RgtrCarSchema } from './schemas/registor.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'RgtrCar', schema: RgtrCarSchema}])],
  controllers: [RegistorController],
  providers: [RegistorService]
})
export class RegistorModule {}
