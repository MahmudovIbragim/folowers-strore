import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


@WebSocketGateway()
export class WebSocketGateways implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: any;

  afterInit(server: Server) {
    console.log('init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('connection', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect', client.id);
  }


  @SubscribeMessage('message')
  handleMessage(@MessageBody()  message: string) {
    console.log(' message' , message);
    this.server.emit('message', `echo: ${message}`);
  }
  
}