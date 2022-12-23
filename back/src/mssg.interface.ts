import { LegacyCharacterEncoding } from "crypto";
import { Socket, Server } from 'socket.io';

export declare interface Mssg {
    name: string;
    text: string;
    time: number;
  }

export declare interface Room{
    name: string;
    mssg: Mssg[];
    status: number; //0: public, 1: private
  }


export class Msssg implements Mssg{
  name: string;
  text: string;
  time: number;

  constructor(name: string, text: string)
  {
    const d = new Date();
    this.time = d.getTime();
    this.name = name;
    this.text = text;

  }
}
export class roooms implements Room {
  name: string;
  mssg: Msssg[];
  status: number;
  users: User[];

  constructor(name: string) {
    this.name = name;
    this.mssg = []
    this.status = 0;
    this.users = [];
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
  constructor(socket: Socket, name: string) {
    this.socket = socket;
    this.user_name = name;
  }
  


}