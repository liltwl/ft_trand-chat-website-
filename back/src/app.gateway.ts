import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Mssg , User} from './mssg.interface';
import { RoomService } from './app.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private appService: RoomService) {}
    @WebSocketServer() server: Server;
    
    private logger: Logger = new Logger('AppGateway');
    // private Mssgs: MssgsService = new MssgsService();
    @SubscribeMessage('msgToServer')
    async handleMessage(client: Socket, payload: any): Promise<void> {
    var mssssg= this.appService.create(payload?.room, payload?.mssg, client);
    console.log(mssssg);
    this.server.emit('msgToClient',{ name:payload.room, mssg:[mssssg]});
    
  }

  @SubscribeMessage('createRoom')
    async createRoom(client: Socket, roomName: any): Promise<void> {
    this.appService.create(roomName?.name,undefined, client);
    this.server.emit('RoomCreated', {name:roomName?.name, mssg: [] ,status: 0,users:[]});
    
  }
  @SubscribeMessage('connection')
  async handleconnection(client: Socket, name: any): Promise<void> {
    this.appService.adduser(client,name);
    this.logger.log(`Client connected: ${name} ${client.id}`);
  
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connect: ${client.id}`);
  }
}
