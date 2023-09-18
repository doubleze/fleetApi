import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './schemas/users.schema';
import { UsersDto } from './dto/users.dto';
import { logInDto } from './dto/log_in.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('sigUp')
  async signUp(
    @Body()
    usrInf: UsersDto,
  ) {
    return this.usersService.signUp(usrInf);
  }


  @Get('logIn/:usN/:psrd')
  async logIn(
    @Param('usN') usN: string,
    @Param('psrd') psrd: string,
  ): Promise<Number> {
    return this.usersService.signIn(usN, psrd);
  }


  @Post('logIn')
  async logIns(
    @Body()
    usrInf: logInDto,
  ) {
    return this.usersService.signIns_(usrInf);
  }

  @Put('update/:_id')
  async updatCrInf(
    @Param('_id')
    _id: string,
    @Body()
    usrInf: UsersDto,
  ): Promise<Users> {
    return this.usersService.updatUrs(_id, usrInf);
  }

  @Get('all')
  async getUsers(): Promise<Users[]> {
    return this.usersService.findAllUrs();
  }
}
