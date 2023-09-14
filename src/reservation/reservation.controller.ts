import { Body, Controller, Param, Post, Get, Put } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { RsvDto } from './dto/resrvation.dto';
import { Rservations } from './schemas/reservation.schema';
import { RegistorService } from 'src/registor/registor.service';
import { Type } from 'class-transformer';

@Controller('reservation')
export class ReservationController {
  constructor(
    private rsvService: ReservationService,
    private registorService: RegistorService,
  ) {}

  @Post('Nrs')
  async creatCar(
    @Body()
    rsSch: RsvDto,
  ) {
    // const counts = rsSch.vehicle.length;
    // // for(counts, i<)
    
    // console.log(counts);

    // registorService
    // this.registorService.updateCrsLst(rsSch.vehicle, rsSch.tm_frm, rsSch.tm_to );
    const newRsv = this.rsvService.creatRsv(rsSch);


    return newRsv;
  }

  @Get()
  async getAllCrs(): Promise<Rservations[]> {
    return this.rsvService.findAllRsv();
  }

  @Get('byId/:_id')
  async fetchById(
    @Param('_id')
    _id: string,
  ): Promise<Rservations> {

      const crInf = this.rsvService.findById(_id);    
      return crInf;
  }

 

  @Put('update/:_id')
  async updatRsvInf(
    @Param('_id')
    _id: string,
    @Body()
    rsDt: RsvDto,
  ): Promise<Rservations> {

    return this.rsvService.updatRsv(_id, rsDt);
  }
}
