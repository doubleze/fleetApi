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
    const nwCr = await this.rgtrCarModel.create(crInf);
    return nwCr;
  }
  async findAllCars(): Promise<RgtrCar[]> {
    const allCrs = await this.rgtrCarModel.find();
    if (!allCrs) {
        throw new NotFoundException('No Car Information not found');
      }
    return allCrs;
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
    return await this.rgtrCarModel.findByIdAndUpdate(_id, crinf, {
      new: true,
      runValidators: true,
    });
  }
}
