import {Controller, Get, Post, Body, Param, Delete, UseGuards, Patch} from '@nestjs/common';
import { SmsService } from './sms.service';
import {CreateSmDto, CreateSmsDto} from './dto/create-sm.dto';
import {AuthGuard} from "@nestjs/passport";
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}
  
  @Post('/add-phone')
  @UseGuards(AuthGuard('jwt'))
  create(
      @Body() createSmDto: CreateSmDto,
      @UserObj() user: User,
  ) {
    return this.smsService.create(createSmDto);
  }

  @Post('/sms-send')
  @UseGuards(AuthGuard('jwt'))
  send(
      @Body() createSmsDto: CreateSmsDto,
      @UserObj() user: User,
  ) {
    return this.smsService.send(createSmsDto);
  }

  @Get('/sms-sent/:id')
  @UseGuards(AuthGuard('jwt'))
  getAllSent(
    @Param() date: string,
    @UserObj() user: User,
  ) {
    return this.smsService.getAllSent(date);
  }

  @Get('/get-all')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.smsService.findAll();
  }

  @Get('/groups/get-all')
  @UseGuards(AuthGuard('jwt'))
  findAllGroups() {
    return this.smsService.findAllGroups();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOneNumber(
      @Param('id') id: string
  ) {
    return this.smsService.findOneNumber(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
      @Param('id') id: string,
      @Body() CreateSmDto: CreateSmDto) {
    return this.smsService.update(id, CreateSmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smsService.remove(+id);
  }
}
