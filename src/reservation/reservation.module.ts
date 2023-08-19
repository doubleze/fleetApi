import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rservations, RservationsSchema } from './schemas/reservation.schema';
import { RegistorService } from 'src/registor/registor.service';
import { RegistorModule } from 'src/registor/registor.module';
import { RgtrCarSchema } from 'src/registor/schemas/registor.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Rservations', schema: RservationsSchema}]), MongooseModule.forFeature([{ name: 'RgtrCar', schema: RgtrCarSchema}]), RegistorModule],
  providers: [ReservationService, RegistorService],
  // providers: [ReservationService],
  controllers: [ReservationController]
})
export class ReservationModule {}
