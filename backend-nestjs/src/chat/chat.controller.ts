import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";
import {AuthGuard} from "@nestjs/passport";

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
      @Body() createChatDto: CreateChatDto,
      @UserObj() user: User,
  ) {
    return this.chatService.create(createChatDto, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: CreateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
