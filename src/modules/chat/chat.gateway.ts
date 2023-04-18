import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';
import {ChatService} from "./chat.service";
import {Message} from "../../models/chat/message.interface";
import {CustomerService} from "../customer/customer-logic/customer.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private chatService: ChatService,
                private customerService: CustomerService) {

    }

    @WebSocketServer() server: Server;

    @SubscribeMessage('sendChat')
    async handleChatCreate(client: Socket, payload: { from: string, to: string }) {
        const chat = await this.chatService.createChat(payload.from, payload.to);
        this.server.emit('getChat', chat)
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: { chatId: string, message: Message }) {
        const message = await this.chatService.addMessage(payload.chatId, payload.message);
        const availableSms: number = await this.customerService.setCustomerMessages(payload.message.customer);
        const internet = await this.customerService.setCustomerInternet({
            ...payload.message.customer,
            planData: {...payload.message.customer.planData, availableSms: availableSms}
        }, Math.random());
        this.server.emit('getMessage', message)
    }

    handleDisconnect(client: any) {
        console.log(client)
    }

    handleConnection(client: any, ...args: any[]) {
        console.log(client)
    }

    afterInit(server: any) {
        console.log(server)
    }

}