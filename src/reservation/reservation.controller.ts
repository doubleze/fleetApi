import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { RsvDto } from './dto/resrvation.dto';
import { Rservations } from './schemas/reservation.schema';
import { RegistorService } from 'src/registor/registor.service';
import { Type } from 'class-transformer';

@Controller('reservation')
export class ReservationController {
    constructor(private rsvService: ReservationService,
      private registorService: RegistorService 
      ) {}

  
  @Post('Nrs')
  async creatCar(
      @Body()
    rsSch: Rservations) {
      const inf = rsSch.vehicle[0].toLocaleString();
      console.log(`Car Id   =  ${inf}  `);
      const crInf = await this.registorService.findById(inf);
      // const rserv = 
      rsSch.vehicles =crInf;
      // rsSch.vehicle = [].map(car => carInf);
      console.log(crInf);
    console.log(rsSch);
    return `Reservation ${crInf} is created !`;
  }


}
