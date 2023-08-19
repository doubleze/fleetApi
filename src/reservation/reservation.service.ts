import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Rservations } from './schemas/reservation.schema';
import { RegistorService } from 'src/registor/registor.service';

@Injectable()
export class ReservationService {
    constructor(
        @InjectModel(Rservations.name)
        private rservationsModel: mongoose.Model<Rservations>,
    ){}

    async creatRsv(rsvinf: Rservations): Promise<Rservations> {
        const nwRsv = await this.rservationsModel.create(rsvinf);
        return nwRsv;
      }
      async findAllRsv(): Promise<Rservations[]> {
        const allRsv = await this.rservationsModel.find();
        if (!allRsv) {
            throw new NotFoundException('No Reservation Information is found');
          }
        return allRsv;
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
}
