import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Socket, Server} from 'socket.io';
import {Customer} from "../../models/customer/customer.schema";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class CallGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor() {
    }

    @WebSocketServer() server: Server;

    @SubscribeMessage('signalToCallCustomer')
    async signalToCall(client: Socket, payload: Customer) {
        this.server.emit('signalToCallCustomer', payload);
    }

    @SubscribeMessage('send-call')
    async sendCall(client: Socket, payload: any) {
        client.broadcast.emit('call', payload)
    }

    @SubscribeMessage('setToCustomer')
    async setToCustomer(client: Socket, payload: Customer) {
        this.server.emit('setToCustomer', payload)
    }
    @SubscribeMessage('setFromCustomer')
    async setFromCustomer(client: Socket, payload: Customer) {
        this.server.emit('setFromCustomer', payload)
    }

    afterInit(server: any) {
        console.log(server)
    }

    handleConnection(client: any, ...args: any[]) {
        console.log(client)
    }

    handleDisconnect(client: any) {
        console.log(client)
    }
}