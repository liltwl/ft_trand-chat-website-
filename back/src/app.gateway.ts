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
  
  
  afterInit(server: Server) {
    this.logger.log('Init');
  }


  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connect: ${client.id}`);
  }
  
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  
  @SubscribeMessage('connection')
  async handleconnection(client: Socket, name: any): Promise<void> {
    this.appService.adduser(client,name);
    this.logger.log(`Client connected: ${name} ${client.id}`);
  }
  
  @SubscribeMessage('createRoom')
    async createRoom(client: Socket, room: any): Promise<void> {
    var tmp = this.appService.createroom(room?.name, Number(room?.status), room?.pass, client);
    this.appService.emitChannel(client, 'RoomCreated', tmp, this.appService.getroom(tmp.name));
  }


  @SubscribeMessage('adduserToServer')
  async addusertoroom(client: Socket, data: any): Promise<void> {
    this.appService.addusertoroom(data.room_name , data.user_name, client);
  }

  private logger: Logger = new Logger('AppGateway');
  // private Mssgs: MssgsService = new MssgsService();
  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: any): Promise<void> {
  var tmp = this.appService.addmssg(payload?.room, payload?.mssg, client);
  this.appService.emitChannel(client, 'msgToClient', tmp, { name:payload.room, mssg:[tmp.mssg[tmp.mssg.length - 1]]});
}

  @SubscribeMessage('deleteToServer')
  async delete(client: Socket, data: any): Promise<void> {//data {room_name:string}
    this.appService.deleteroom(client, data.room_name);  
  }


  @SubscribeMessage('leaveToServer')
  async leave(client: Socket, data: any): Promise<void> {  //data {room_name:string, user_name: string}
    this.appService.userleave(client, data.room_name, data.user_name);  
  }


  @SubscribeMessage('adminToServer')
  async admin(client: Socket, data: any): Promise<void> {  //data {room_name:string, user_name: string}
    this.appService.addadmin(client, data.room_name, data.user_name); 
  }
  
  @SubscribeMessage('bannedToServer')
  async ban(client: Socket, data: any): Promise<any> {//data {room_name:string, user_name: string, endof: date}
    const tmp = this.appService.userban(client, data.room_name, data.user_name,155);
    return tmp;
  }


}
