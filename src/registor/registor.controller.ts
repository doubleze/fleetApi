import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { RgtrCar } from './schemas/registor.schema';
import { RegCrsDto } from './dto/registorCar.dto';
import { RegistorService } from './registor.service';
import mongoose from 'mongoose';

@Controller('regtCars')
export class RegistorController {
  constructor(private registorService: RegistorService) {}

  @Post('Ncr')
  async creatCar(
    @Body()
    rgCar: RegCrsDto,
  ): Promise<RgtrCar> {
    return this.registorService.creatCrs(rgCar);
  }

  @Get()
  async getAllCrs(): Promise<RgtrCar[]> {
    return this.registorService.findAllCars();
  }

  @Get('byId/:_id')
  async fetchById(
    @Param('_id')
    _id: string,
  ): Promise<RgtrCar> {

      const crInf = this.registorService.findById(_id);    
      return crInf;
  }

  @Get('plats/:plate')
  async fetchByPlat(
    @Param('plate')
    plate: string,
  ): Promise<RgtrCar> {
    return this.registorService.findByPlat(plate);
  }

  @Post('update/:_id')
  async updatCrInf(
    @Param('_id')
    _id: string,
    @Body()
    rgCar: RegCrsDto,
  ): Promise<RgtrCar> {
    return this.registorService.updatCrs(_id, rgCar);
  }


  
  @Get('dropdown')
  async getDropdownList(@Param('model') model: string): Promise<{ value: string; label: string; }[]> {
    console.log("over here 1");
    const crInf = await this.registorService.findAllCars();
    const options = crInf.map((carS) => ({
      value: carS.model,
      label: carS.platNo,
    }));
    return options;
  }

  
}
