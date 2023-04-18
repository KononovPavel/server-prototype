import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Chat, ChatDocument} from "../../models/chat/chat.schema";
import {v4 as uuidv4} from 'uuid';
import {Customer, CustomerDocument} from "../../models/customer/customer.schema";
import {Message} from "../../models/chat/message.interface";

@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
                @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {
    }


    async createChat(from:string, to: string): Promise<Chat | HttpException> {
        const fromCustomer = await this.customerModel.findOne({customerId: from});
        const toCustomer = await this.customerModel.findOne({customerId: to});
        const foundedChats = await this.chatModel.find();
        const filteredChats = foundedChats?.filter((chat: Chat) => chat?.from?.customerId === from && chat?.to?.customerId === to);
        if(!!filteredChats?.length) {
            return new HttpException('Chat usually created', HttpStatus.NOT_FOUND);
        }
        const newChat = {
            from: fromCustomer,
            to: toCustomer,
            chatId: uuidv4(),
            chatName: to,
            image: null,
            messages: []
        } as Chat
        const createdChat = await this.chatModel.create(newChat);
        return createdChat;
    }

    async getChatsByCustomer(customerId: string): Promise<Chat[]> {
        let foundedChats = await this.chatModel.find();
        foundedChats = foundedChats.filter((chat: Chat)=> chat.to.customerId === customerId || chat.from.customerId === customerId);
        return foundedChats;
    }

    async addMessage(chatId: string, message: Message): Promise<Message> {
        message = {...message, messageId: uuidv4(), date: new Date()}
        await this.chatModel.findOneAndUpdate({chatId: chatId}, {$push: {messages:message}});
        return message;
    }

    async getMessagesByChat(chatId: string): Promise<Message[]> {
        const chat = await this.chatModel.findOne({chatId: chatId});
        return chat?.messages?.length ? chat.messages: []
    }
}
