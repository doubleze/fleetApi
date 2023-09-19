import { Body, Controller, Param, Post, Get, Put } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { RsvDto } from './dto/resrvation.dto';
import { Rservations } from './schemas/reservation.schema';
import { RegistorService } from 'src/registor/registor.service';
import { Type } from 'class-transformer';
import { RsvUpDto } from './dto/resrvationUpdt.dto';

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
  async getAllRsv(): Promise<Rservations[]> {
    return this.rsvService.findAllRsv(); //findAllRsvG
  }

  @Get('/grouped')
  async getAllRsvGst(): Promise<{ [key: string]: Rservations[] }> {
    return this.rsvService.findAllRsvG(); 
  }

  @Get('byStat/:stat')
  async getAllRsvByStat(
    @Param('stat')
    stat: string,
  ): Promise<Rservations[]> {
    return this.rsvService.findAllRsvsByStut(stat);
  }

  @Get('byUser/:Usr/:stat')
  async getAllRsvUsr(
    @Param('Usr')
    Usr: string,
    @Param('stat')
    stat: string,
  ): Promise<Rservations[]> {
    return this.rsvService.findAllRsvByUser(Usr, stat);
  }

  @Get('byUser/:Usr')
  async getAllRsvUsrNm(
    @Param('Usr')
    Usr: string
  ): Promise<Rservations[]> {
    return this.rsvService.findAllRsvByUserNm(Usr);
  }

  @Get('byDepr/:departmnt')
  async getAllRsvDprt(
    @Param('departmnt')
    departmnt: string,
  ): Promise<Rservations[]> {
    return this.rsvService.findAllRsvByDep(departmnt);
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

  @Put('uptStus/:_id')
  async updatRsvStat(
    @Param('_id')
    _id: string,
    @Body()
    rsDt: RsvUpDto,
  ): Promise<Rservations> {
    return this.rsvService.updatStatus(_id, rsDt);
  }
}
