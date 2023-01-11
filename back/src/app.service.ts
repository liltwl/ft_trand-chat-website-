import { Injectable } from '@nestjs/common';
import { roooms, Msssg, User, Banned } from './mssg.interface';
import { Socket, Server } from 'socket.io';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { validateHeaderName } from 'http';
import { Cipher } from 'crypto';
import { map } from 'rxjs';
import { lstat } from 'fs';


@Injectable()
export class RoomService {
  private Rooms = new Array<roooms>();//Room[] = [{name:"test",mssg: []}];
  private users = new Array<User>();
  private sockets = new Array<{user_name: string, client : Socket}>();

  emitChannel(client: Socket, event: string, room: roooms, data: any){
    this.sockets.map((socket) => { socket.client.emit(event,data)})
  //   if (room?.status === 1)
  //   {
  //     this.sockets.map((socket) => { socket.client.emit(event,data)})
  //   }
  //   else
  //   {
  //     this.sockets.map((socket) => { socket.client.emit(event,data)})
  //   }
  }

  addsocket(client_:Socket, user_n: string){
    this.sockets.push({user_name:user_n,client: client_})
    console.log(this.sockets)
  }

  deletesocket(client:Socket)
  {
    var index = this.sockets.indexOf( this.sockets.find((socket)=>socket.client.id === client.id))
    if (index !== undefined && index >= 0)
      this.sockets.splice(index, 1);
    console.log("delete socket :", index, "in :",this.sockets)
  }




  createroom(name: string, security: number, pass: string, client: Socket ): roooms {
    var room = this.Rooms.find((m) => m.name === name);
    var user = this.users.find((us) => us.socket.id === client.id)
    if (!room)
    {
      room = new roooms(name)
      room.status = security;
      room.password = pass;
      room.owner = user;
      room.admins.push(user);
      room.users.push(user);
      user.rooms.push(room);
      if (room.status === 1)
      {
        this.users.map((user1) => { 
		 if (user1.user_name !== user.user_name)
          user1.rooms.push(room);
       })
      }
      this.Rooms.push(room);
    }
    else
      return undefined;

     
    return (room);
  }


  addmssg(name: string,mssg :Msssg, client: Socket) :roooms
  {
    var room = this.Rooms.find((m) => m.name === name);
    if (mssg && room)
    {
      room.setMssg(mssg);
      return (room);
    }
    return undefined;
  }


  addusertoroom(room_name:string, user_name: string, client: Socket): void {
    var room = this.Rooms.find((rom) => rom.name === room_name)
    var user = this.users.find((us) => us.user_name === user_name)
    console.log(room)
    if (user && !room?.users?.find((us) =>  us.user_name === user.user_name))
    {
      user.rooms.push(room)
      this.emitChannel(client, 'adduserToClient', room, { room_name:room.name, user_name: user.user_name}); //hadchi khassak tayafm3ah
      room.users.push(user);
      console.log("user added :"+user_name)
      user.socket.emit('RoomCreated', this.getroom(room.name))
    }
  }

  
  adduser(client: Socket, name: any): void {
    var user = this.users.find((m) => m.user_name === name);
    if (user)
      user.socket = client;
    else{
      user = new User(client ,name);    
      this.users.push(user);

      
      this.users?.map((tmpuser) => {
        if (tmpuser.user_name !== name)
        {
          var room = new roooms(user.user_name+tmpuser.user_name)
          room.socketname = uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals]
          });
          room.status = 0;
          room.isdm = 1;
          room.users.push(tmpuser)
          room.users.push(user)
          tmpuser.rooms.push(room)
          this.Rooms.push(room);
        }
      })    // craet room to all user fr
      this.Rooms?.map((val) => {if(val.status === 1 || val?.users?.find((val1) => val1.user_name === user.user_name)) user.rooms.push(val)}) //add rooms to new user
      console.log(user?.rooms)
    }
    
  }


  userleave(client: Socket, room_name: string, user_name: string) {
    var room = this.Rooms.find((rom) => rom.name === room_name)
    var user = this.users.find((us) => us.user_name === user_name)
    var socket_user = this.users.find((us) => us.socket.id === client.id)
    if ((room.admins.find((m) => m.user_name === user_name) && room.owner.user_name !== user_name) || socket_user.user_name === user_name)
    {
      var index = room.users.indexOf(user)
      room.users.splice(index,1)
      index = user.rooms.indexOf(room)
      user.rooms.splice(index,1)
      if (socket_user.user_name === user.user_name)
      {
          room.owner = room.users[0]
          room.admins.push(room.owner)
      }
      if (room.admins.find((m) => m.user_name === user_name))
      {
        index = room.admins.indexOf(user)
        room.admins.splice(index, 1)
      }
      if (!room.users[0])
      {
        this.deleteroom(client, room_name)
      }
      else
        this.emitChannel(client, 'leaveToClient', room, {room: room_name, user: user_name});
    }
  }

  deleteroom(client: Socket, room_name: string)
  {
    var room = this.Rooms.find((rom) => rom.name === room_name)
    var index = this.Rooms.indexOf(room)
    var socket_user = this.users.find((us) => us.socket.id === client.id)
    if (room.owner.user_name === socket_user.user_name){
      console.log(room_name)
      this.users.map((user) => {user.rooms.splice(user.rooms.indexOf(room),1)})
      console.log(room.name)
      this.emitChannel(client, 'deleteToClient', room, {room: room_name});
      this.Rooms.splice(index, 1);
      console.log("delete :"+room_name)
      console.log(this.Rooms)
    }
  }

  addadmin(client: Socket, room_name: string, user_name: string){
    var room = this.Rooms.find((rom) => rom.name === room_name)
    var user = this.users.find((us) => us.user_name === user_name)
    var socket_user = this.users.find((us) => us.socket.id === client.id)

    if (room.admins.find((m) => socket_user.user_name === m.user_name) && !room.admins.find((m) => user_name === m.user_name))
    {
      room.admins.push(user)
    }
    else if (room.admins.find((m) => socket_user.user_name === m.user_name) && room.admins.find((m) => user_name === m.user_name))
    {
      room.admins.splice(room.admins.indexOf(user), 1)
    }
  }

  userban(client: Socket, room_name: string, user_name: string, endof: number){
    var room = this.Rooms.find((rom) => rom.name === room_name)
    var user = this.users.find((us) => us.user_name === user_name)
    var socket_user = this.users.find((us) => us.socket.id === client.id)
    console.log("ban")
    if (room.isdm === 1 && room?.banned)
    {
      if (!room.banned.find((m)=>m.user_name === user_name))
        {var banned = new Banned(room.name, user.user_name, endof)
        room.banned.push(banned);}
      else
        room.banned.splice(room.banned.indexOf(room.banned.find((m)=>m.user_name === user_name)), 1)
        this.emitChannel(client, 'bannedToClient', room, {room: room_name, banned: banned});
        // this.emitChannel(client, 'bannedToClient', room, {room: room_name, banned: banned});
    }
    else if ((room.admins.find((m) => socket_user.user_name === m.user_name) && room.owner.user_name !== user_name) || !room.banned.find((m)=>m.user_name === user_name))
    {
        var banned = new Banned(room.name, user.user_name, endof)
        room.banned.push(banned);
        this.emitChannel(client, 'bannedToClient', room, {room: room_name, banned: banned});
    }
    else if ((room.admins.find((m) => socket_user.user_name === m.user_name) && room.owner.user_name !== user_name) || room.banned.find((m)=>m.user_name === user_name))
    {
      room.banned.splice(room.banned.indexOf(room.banned.find((m)=>m.user_name === user_name)), 1)
      this.emitChannel(client, 'bannedToClient', room, {room: room_name, banned: banned});
    }
    else
      return 0
    return 1
  }

  findmssgs(name: string): Msssg[] {
    console.log(this.Rooms.find((m) => m.name === name)?.mssg)
    return this.Rooms.find((m) => m.name === name)?.mssg;
  }

  findAll(): roooms[] {
    return [...this.Rooms];
  }

  getallusers() : User[]
  {
    var tmp = [];
    this.users.map((user) => {
      tmp.push({user_name:user?.user_name});
      })
    console.log(tmp)
    return [...tmp];
  }
  getuser(name: string) : User
  {
    var tmp = this.users.find((val) => val.user_name === name)
    return tmp
  }


  getroom(name: string) : roooms
  {
	  var val = this.Rooms.find((room) => room.name === name)
      var room = new roooms(name);
      room.isdm = val.isdm;
      room.status = val.status;
      room.owner = new User(undefined,val.owner?.user_name)
      val.users.map((tmpuser) => room.users.push(new User(undefined,tmpuser.user_name)))
      // val?.banned?.map((tmpban) => room.banned.push(new Banned(tmpban.room, tmpban.user, tmpban.endof)))
      room.socketname= val.socketname;
      room.mssg=[val.mssg[val.mssg.length - 1]];
      return room;
  }

  
}