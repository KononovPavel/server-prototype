import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {ChatService} from "./chat.service";
import {Message} from "../../models/chat/message.interface";


@Controller('/chat')
export class ChatController {
    constructor(private chatService: ChatService) {
    }

    @Post()
    createChat(@Body() {from, to}: {to: string, from: string}) {
        return this.chatService.createChat(from, to);
    }

    @Get('/:customerId')
    getChatsByCustomer(@Param('customerId') customerId: string) {
        return this.chatService.getChatsByCustomer(customerId);
    }

    @Put('/:chatId')
    addMessageToChat(@Param('chatId') chatId: string, @Body() message: Message) {
        return this.chatService.addMessage(chatId, message);
    }

    @Get("/message/:chatId")
    getMessagesByChat(@Param('chatId') chatId: string) {
        return this.chatService.getMessagesByChat(chatId);
    }
}