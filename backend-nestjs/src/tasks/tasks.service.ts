import {Injectable} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';

import {TaskInterface} from "../interfaces/task";
import {Task} from "./entities/task.entity";
import {Like} from "typeorm";
import {User} from "../user/user.entity";

@Injectable()
export class TasksService {
    filter(task: Task): TaskInterface {
        const {id, name, completed} = task;
        return {id, name, completed};
    }

    async create(req: CreateTaskDto, user: User) {
        console.log(user)
        try {
            const task = new Task();
            task.name = req.name;
            task.completed = req.completed;
            task.user = user.email;

            await task.save();

        } catch (e) {
            throw e;
        }

    }

    async findAll(name: string, user: User): Promise<TaskInterface[]> {

        const tasks = (await Task.find({
            where: {
                user: user.email,
                name: Like(`%${name}%`)
            }
        }))

        return tasks

    }

    async findOne(id: string) {
        const task = await Task.findOne({
            where: {
                id,
            }
        });

        return task;
    }


    async update(id: string, req: UpdateTaskDto) {
        if (!id) {
            throw new Error('Task not found!')
        }

        const task = await Task.findOne({
            where: {
                id,
            }
        });

        if (task) {
            task.completed = req.completed;
            task.name = req.name;
            await task.save();

            return {
                isSuccess: true,
            };
        }

        return {
            isSuccess: false,
        };
    }


    async remove(id: string) {
        if (!id) {
            throw new Error('Task not found!')
        }

        const task = await Task.findOne({
            where: {
                id,
            }
        });

        if (task) {
            await task.remove();

            return {
                isSuccess: true,
            };
        }

        return {
            isSuccess: false,
        };

    }


}
