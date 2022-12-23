import { Injectable } from '@nestjs/common';
import { Mssg, Room, roooms, Msssg, User } from './mssg.interface';
import { Socket, Server } from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';


@Injectable()
export class RoomService {
  private Rooms = new Array<roooms>();//Room[] = [{name:"test",mssg: []}];
  private users = new Array<User>();
  create(name: string, mssg: Msssg,client: Socket ): Msssg { 

    var room = this.Rooms.find((m) => m.name === name);
    if (!room)
    {
      room = new roooms(name)
      if (mssg)
        room.setMssg(mssg);
      this.Rooms.push(room);
    }
    else if (mssg) 
      room.setMssg(mssg);
    return (room.mssg[room.mssg.length - 1]);
  }

  adduser(client: Socket, name: any): void {
    if (this.users.find((m) => m.user_name === name))
    {
      this.users.find((m) => m.user_name === name).socket = client;
    }
    else{
      var user = new User(client ,name);
      this.users.push(user);
    }
      this.Rooms.map((room) => {
      if (room.status === 0)
        client.join(room.name)
      })
  }

  findmssgs(name: string): Msssg[] {
    console.log(this.Rooms.find((m) => m.name === name)?.mssg)
    return this.Rooms.find((m) => m.name === name)?.mssg;
  }

  findAll(): roooms[] {
    console.log(this.Rooms)
    return [...this.Rooms];
  }

  getallusers() : User[]
  {
    var tmp = [];
    this.users.map((user) => {
      tmp.push({name:user?.user_name});
      })
    console.log(tmp)
    return [...tmp];
  }
}