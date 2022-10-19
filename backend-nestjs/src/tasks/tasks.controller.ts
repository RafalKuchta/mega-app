import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {AuthGuard} from "@nestjs/passport";
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";
import {ACGuard, UseRoles} from "nest-access-control";

@Controller('todo')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
      @Body() createTaskDto: CreateTaskDto,
      @UserObj() user: User,
  ) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get('/search/:name?')
  @UseGuards(AuthGuard('jwt'))
  findAll(
      @Param('name') name: string,
      @UserObj() user: User,
  ) {
    return this.tasksService.findAll(name ?? '', user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(
      @Param('id') id: string,
      @UserObj() user: User,
  ) {
    return this.tasksService.findOne(id);
  }


  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'update',
    resource: 'posts'
  })
  update(
      @Param('id') id: string,
      @Body() updateTaskDto: UpdateTaskDto)
  {
    return this.tasksService.update(id, updateTaskDto);
  }


  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
