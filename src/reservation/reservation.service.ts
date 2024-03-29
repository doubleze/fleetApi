import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Rservations } from './schemas/reservation.schema';
import { RegistorService } from 'src/registor/registor.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Rservations.name)
    private rservationsModel: mongoose.Model<Rservations>,
  ) {}

  async creatRsv(rsvinf: Rservations): Promise<Rservations> {
    if (!rsvinf.reqStat) {
      rsvinf.reqStat = 0;
    }
    const nwRsv = await this.rservationsModel.create(rsvinf);
    return nwRsv;
  }

  async findAllRsv(): Promise<Rservations[]> {
    const allRsv = await this.rservationsModel.find();
    if (!allRsv) {
      return [];
    }
    // Parse the date strings into Date objects and then sort
    return allRsv.sort((a, b) => {
      const dateA = new Date(a.dts);
      const dateB = new Date(b.dts);

      // Sort in ascending order, modify the comparison logic as needed
      return dateA.getTime() - dateB.getTime();
    });
  }

  async findAllRsvG(): Promise<{ [key: string]: Rservations[] }> {
    const allRsv = await this.rservationsModel.find();
    if (!allRsv) {
      return {};
    }
  
    // Use reduce to group reservations by reqStat
    const groupedReservations = allRsv.reduce((result, reservation) => {
      const reqStat = reservation.reqStat;
  
      // Check if the reqStat is already a property in the result object
      if (!result[reqStat]) {
        result[reqStat] = [];
      }
  
      // Add the reservation to the corresponding reqStat group
      result[reqStat].push(reservation);
  
      return result;
    }, {});
  
    return groupedReservations;
  }
  

  async findAllRsvsByStut(stat: string): Promise<Rservations[]> {
    const allRsv = await this.rservationsModel.find({ reqStat: stat });
    if (!allRsv) {
      return [];
    }
    return allRsv;
  }

  async findAllRsvByUserNm(user: string): Promise<Rservations[]> {
    try {
      const allRsv = await this.rservationsModel
        .find({ userName: user })
        .exec();

      if (!allRsv) {
        return [];
      }
      return allRsv;
    } catch (error) {
      throw new NotFoundException('Rerservation Information fined error !');
    }
  }

  async findAllRsvByUser(user: string, stat: string): Promise<Rservations[]> {
    try {
      const allRsv = await this.rservationsModel
        .find({ userName: user, reqStat: stat })
        .exec();

      if (!allRsv) {
        return [];
      }
      return allRsv;
    } catch (error) {
      throw new NotFoundException('Rerservation Information fined error !');
    }
  }

  async findAllRsvByDep(departmnt: string): Promise<Rservations[]> {
    try {
      const allRsv = await this.rservationsModel
        .find({ depmnt: departmnt })
        .exec();

      if (!allRsv) {
        return [];
      }
      return allRsv;
    } catch (error) {
      throw new NotFoundException('Rerservation Information fined error !');
    }
  }

  async findById(_id: string): Promise<Rservations> {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const rsvId = new mongoose.Types.ObjectId(_id);
    const rsvtn = await this.rservationsModel.findById(rsvId);
    if (!rsvtn) {
      throw new NotFoundException('Reservation Information is found');
    }
    return rsvtn;
  }

  async updatRsv(_id: string, rsvinf: Rservations): Promise<Rservations> {
    return await this.rservationsModel.findByIdAndUpdate(_id, rsvinf, {
      new: true,
      runValidators: true,
    });
  }

  async updatStatus(_id: string, rsvinf: Rservations): Promise<Rservations> {
    return await this.rservationsModel.findByIdAndUpdate(_id, rsvinf, {
      new: true,
      runValidators: true,
    });
  }
}
