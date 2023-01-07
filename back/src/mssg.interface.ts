import { LegacyCharacterEncoding } from "crypto";
import { Socket, Server } from 'socket.io';
import { UniqueNamesGenerator } from "unique-names-generator/dist/unique-names-generator.constructor";


export class Msssg {

  name: string;
  text: string;
  time: number; //date

  constructor(name: string, text: string)
  {
    const d = new Date();
    this.time = d.getTime();
    this.name = name;
    this.text = text;

  }
}


export class roooms {



  name: string;

  socketname: string;

  mssg: Msssg[];
  password: string;
  status: number;  //0:private, 1:public, 2:protected
  users: User[];
  isdm: number;
  banned: Banned[];
  muted: Banned[];

  owner: User;

  admins: User[];

  constructor(name: string) {
    this.name = name;
    this.mssg = []
    this.isdm = 0;
    this.status = 1;
    this.owner = undefined
    this.users = [];
    this.admins = [];
    this.muted = [];
    this.banned = [];
  }

  setMssg(mssg: Msssg): void {
    var msg = new Msssg(mssg.name, mssg.text)
    this.mssg.push(msg);
  }

  getmssg(): Msssg[] {
    return this.mssg;
  }
}



export class User{
  user_name: string;


  socket: Socket;
  rooms: roooms[];

  constructor(socket: Socket, name: string) {
    this.socket = socket;
    this.user_name = name;
    this.rooms = []
  }
}

export class Banned{
  room: string;
  endof: number;  //date
  user_name: string;
  constructor(room: string, user_name: string, endof: number){
    this.endof = endof;
    this.user_name = user_name;
    this.room = room;
  }
}