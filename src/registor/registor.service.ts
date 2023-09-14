import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RgtrCar } from './schemas/registor.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RegistorService {
  constructor(
    @InjectModel(RgtrCar.name)
    private rgtrCarModel: mongoose.Model<RgtrCar>,
  ) {}

  async creatCrs(crInf: RgtrCar): Promise<RgtrCar> {
    crInf.carStat = 1;
    const nwCr = await this.rgtrCarModel.create(crInf);
    return nwCr;
  }
  async findAllCars(): Promise<RgtrCar[]> {
    const allCrs = await this.rgtrCarModel.find({ carStat: { $ne: 0 } });
    if (!allCrs) {
      throw new NotFoundException('No Car Information not found');
    }
    return allCrs;
  }

  async findActCars(): Promise<RgtrCar[]> {
    const actCr = await this.rgtrCarModel.find({ carStat: 1 });
    if (!actCr) {
      throw new NotFoundException('No Car ');
    }
    return actCr;
  }

  async findById(_id: string): Promise<RgtrCar> {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const carId = new mongoose.Types.ObjectId(_id);
    const car = await this.rgtrCarModel.findById(carId);
    if (!car) {
      throw new NotFoundException('Car Information not found');
    }
    return car;
  }

  async findByPlat(plate: string): Promise<RgtrCar | null> {
    console.log('parameter ' + plate);
    const crInf = await this.rgtrCarModel.find({ platNo: plate });
    // console.log('data ' + crInf);
    if (!crInf || crInf.length === 0) {
      throw new NotFoundException('Car Information not found');
    }

    return crInf[0];
  }

  async updatCrs(_id: string, crinf: RgtrCar): Promise<RgtrCar> {
    crinf.carStat = 1;
    return await this.rgtrCarModel.findByIdAndUpdate(_id, crinf, {
      new: true,
      runValidators: true,
    });
  }

  async getCrsByIds(ids: string[]): Promise<RgtrCar[]> {
    const carInfs = [];

    for (const id of ids) {
      const carInf = await this.rgtrCarModel.findById(id);
      carInfs.push(carInf);
    }

    return carInfs;
  }

  

  async updateCrsLst(
    ids: string[],
    frmP: string,
    toP: string,
  ): Promise<RgtrCar[]> {
    const updatedCars = [];

    for (const id of ids) {
      // const carIndex = carInfos.findIndex(c => c.id === id);
      // const updateInfo = carInfos[carIndex];

      const updateInfo = await this.findById(id);
      updateInfo.tm_frm = frmP;
      updateInfo.tm_to = toP;
      const updatedCar = await this.rgtrCarModel.findByIdAndUpdate(
        id,
        updateInfo,
        { new: true }, // return updated doc
      );

      updatedCars.push(updatedCar);
    }

    return updatedCars;
  }

 
  async deleteCrs(_id: string): Promise<RgtrCar> {

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const carId = new mongoose.Types.ObjectId(_id);
    const tmpCr = await this.rgtrCarModel.findById(carId);
    if (!tmpCr) {
      throw new NotFoundException('Car Information not found');
    }
    tmpCr.carStat = 0;
    return await this.rgtrCarModel.findByIdAndUpdate(carId, tmpCr);

   
  }

}
