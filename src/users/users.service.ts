import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { logInDto } from './dto/log_in.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private userModel: mongoose.Model<Users>,
  ) {}

  async signUp(usrInf: Users): Promise<string> {
    const hashedPw = await this.hashPWD(usrInf.passWord);
    usrInf.passWord = hashedPw;
    // console.log("over here ");
    // console.log(usrInf);
    try {
      const nwUsr = await this.userModel.create(usrInf);
      return (`User ${nwUsr.firstName} is created !`);
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  async findAllUrs(): Promise<Users[]> {
    const allRsv = await this.userModel.find();
    if (!allRsv) {
      throw new NotFoundException('No User Information is found');
    }
    return allRsv;
  }

  async findById(_id: string): Promise<Users> {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const rsvId = new mongoose.Types.ObjectId(_id);
    const rsvtn = await this.userModel.findById(rsvId);
    if (!rsvtn) {
      throw new NotFoundException('User Information is found');
    }
    return rsvtn;
  }

  async updatUrs(_id: string, usrInf: Users): Promise<Users> {
    const hashedPw = await this.hashPWD(usrInf.passWord);
    usrInf.passWord = hashedPw;
    return await this.userModel.findByIdAndUpdate(_id, usrInf, {
      new: true,
      runValidators: true,
    });
  }

  async signIn(usN: string, psrd: string) : Promise<Number>{
    try {
      
      const usrS =  await this.userModel.findOne({ userName: usN }).exec();    
      if (!usrS) {
        throw new NotFoundException('User Information Not Found !');
      }
  
      const match = await bcrypt.compare(psrd, usrS.passWord);
      console.log(`Check matched = ${match}`);
      if (match) {
        // Passwords match, you can consider the user authenticated
        return usrS.userRole;
      } else {
        throw new NotFoundException('Invalid Password');
      }
    
    } catch (error) {
      throw new NotFoundException('User Information Not Found catched !');
    }
  }
  


  async signIns(usrInf: logInDto) {

    const {userName, passWord } = usrInf;
    console.log(` user name ${userName}  and password ${passWord}`);
    
    try {
      
      const usrS =  await this.userModel.findOne({ userName: userName }).exec();    
      if (!usrS) {
        throw new NotFoundException('User Information Not Found !');
      }
  
      const match = await bcrypt.compare(passWord, usrS.passWord);
      console.log(`Check matched = ${match}`);
      if (match) {
        // Passwords match, you can consider the user authenticated
        return {userRole: usrS.userRole}
      } else {
        throw new NotFoundException('Invalid Password');
      }
    
    } catch (error) {
      throw new NotFoundException('User Information Not Found catched !');
    }
  }
  

  async hashPWD(pwds: string): Promise<string> {
    // const hashedPwd = bcrypt.hash(pwds, 10);
    return await bcrypt.hash(pwds, 10);
  }
}
