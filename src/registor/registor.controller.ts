import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { RgtrCar } from './schemas/registor.schema';
import { RegCrsDto } from './dto/registorCar.dto';
import { RegistorService } from './registor.service';
import mongoose from 'mongoose';
import { UpdtCrsDto } from './dto/updateCar.dto';

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

  @Put('updateCar/:_id')
  async updatCrInf(
    @Param('_id')
    _id: string,
    @Body()
    rgCar: RegCrsDto,
  ): Promise<RgtrCar> {
    return this.registorService.updatCrs(_id, rgCar);
  }

  @Put('deleteCar/:_id')
  async deleteCrInf(
    @Param('_id')
    _id: string,
      ): Promise<RgtrCar> {
    return this.registorService.deleteCrs(_id);
  }

  
  @Get('dropdown')
  async getDropdownList(@Param('model') model: string): Promise<{ value: string; label: string; }[]> {
    // console.log("over here 1");
    const crInf = await this.registorService.findActCars();
    const options = crInf.map((carS) => ({
      value: carS.driverName,
      label: carS.platNo,
    }));
    options.unshift({
      value: "",
      label: "-- select One --",
    });
    return options;
  }

 
}
