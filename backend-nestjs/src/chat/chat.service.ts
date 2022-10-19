import {Injectable} from '@nestjs/common';
import {CreateChatDto} from './dto/create-chat.dto';
import {User} from "../user/user.entity";
import {Chat} from "./entities/chat.entity";
import {ChatInterface} from "../interfaces/chat";

@Injectable()
export class ChatService {
    async create(req: CreateChatDto, user: User) {

        try {
            const chat = new Chat();
            chat.message = req.message;
            chat.user = user.email;

            await chat.save();

        } catch (e) {
            throw e;
        }
    }

    async findAll(): Promise<ChatInterface[]> {
        const chats = (await Chat.find())

        return chats;
    }

    findOne(id: number) {
        return `This action returns a #${id} chat`;
    }

    update(id: number, updateChatDto: CreateChatDto) {
        return `This action updates a #${id} chat`;
    }

    remove(id: number) {
        return `This action removes a #${id} chat`;
    }
}
