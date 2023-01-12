import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { CacheKey, Logger } from '@nestjs/common';
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
  
  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    await this.appService.deletesocket(client)
  }
  
  @SubscribeMessage('connection')
  async handleconnection(client: Socket, name: any): Promise<void> {
    this.logger.log(`Client connected: ${name} ${client.id}`);
    await this.appService.addsocket(client, name);
    // this.appService.adduser(client,name);
  }
  
  @SubscribeMessage('createRoom')
  async createRoom(client: Socket, room: {name: string, status: number, pass:string}): Promise<void> {
    // var tmp = this.appService.createroom(room?.name, Number(room?.status), room?.pass, client);
    console.log("creat room", room)
    this.appService.emitChannel(client, 'RoomCreated', undefined, {
            name: room.name,
            mssg: [],
            isdm: 0,
            status: room.status,
            owner: {user_name: room.user_name},
            users: [{user_name: room.user_name},],
            admins: [{user_name: room.user_name}],
            muted: [],
            banned: []
    });
  }

  private logger: Logger = new Logger('AppGateway');
  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: {room :string, mssg: {name :string , text:string}}): Promise<void> {
  // var tmp = this.appService.addmssg(payload?.room, payload?.mssg, client);
  console.log("messeg :" , payload)
  this.appService.emitChannel(client, 'msgToClient', undefined, payload);
}

  @SubscribeMessage('adduserToServer')
  async addusertoroom(client: Socket, data:  { room_name:string, user_name: string}): Promise<void> {

    // this.appService.addusertoroom(data.room_name , data.user_name, client);
    this.appService.emitChannel(client, 'adduserToClient', undefined, data); //hadchi khassak tayafm3ah    { room_name:room.name, user_name: user.user_name}
    console.log("add user :" , data)

  }


  @SubscribeMessage('deleteToServer')
  async delete(client: Socket, data:  {room_name:string}): Promise<void> {//data {room_name:string}
    // this.appService.deleteroom(client, data.room_name);  
    this.appService.emitChannel(client, 'deleteToClient', undefined, data); //hadchi khassak tayafm3ah    { room_name:room.name, user_name: user.user_name}

  }


  @SubscribeMessage('leaveToServer')
  async leave(client: Socket, data: { room_name:string, user_name: string}): Promise<void> {  //data {room_name:string, user_name: string}
    console.log("delete user :" , data)

    // this.appService.userleave(client, data.room_name, data.user_name);  
    this.appService.emitChannel(client, 'leaveToClient', undefined, data); //hadchi khassak tayafm3ah    { room_name:room.name, user_name: user.user_name}

  }


  @SubscribeMessage('adminToServer')
  async admin(client: Socket, data: { room_name:string, user_name: string}): Promise<void> {  //data {room_name:string, user_name: string}
    // this.appService.addadmin(client, data.room_name, data.user_name);
    this.appService.emitChannel(client, 'adminToClient', undefined, data); //hadchi khassak tayafm3ah    { room_name:room.name, user_name: user.user_name}
  }
  
  @SubscribeMessage('bannedToServer')
  async ban(client: Socket, data: { room_name:string, user_name: string}): Promise<any> {//data {room_name:string, user_name: string, endof: date}
    // const tmp = this.appService.userban(client, data.room_name, data.user_name,155);
    console.log("ban user :" , data)

    this.appService.emitChannel(client, 'bannedToClient', undefined, data); //hadchi khassak tayafm3ah    { room_name:room.name, user_name: user.user_name}
    return 1;
  }

  @SubscribeMessage('mutedToServer')
  async muted(client: Socket, data:  { room_name:string, user_name: string}): Promise<any> {//data {room_name:string, user_name: string, endof: date}
    // const tmp = this.appService.userban(client, data.room_name, data.user_name,155);
    console.log("muted user :" , data)
    
    this.appService.emitChannel(client, 'mutedToClient', undefined, data); //hadchi khassak tayafm3ah    { room_name:room.name, user_name: user.user_name}
    return 1;
  }

}
