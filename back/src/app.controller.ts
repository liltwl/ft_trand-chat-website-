import { Controller, Get, Post, Body,Query } from '@nestjs/common';
import { Mssgdto } from './dto/mssg.dto';
import { RoomService } from './app.service';
import { Banned, Msssg, roooms, User} from './mssg.interface';
import { Logger } from '@nestjs/common';
import { userInfo } from 'os';
import { callbackify } from 'util';

@Controller('app')
export class appController {
  constructor(private chatService: RoomService) {}
  
  logger: Logger = new Logger('AppGateway');
  @Post()
  async create(@Body() createMssgDto: Msssg): Promise<void> {
    // if (createMssgDto.name && createMssgDto.text)
    //   this.chatService.create(createMssgDto.name,createMssgDto);
    console.log(createMssgDto);
  }

  @Get('mssgs')
  async findAll(@Query() n: {name: string}): Promise<any[]> {
    console.log("find mssgs" + n.name);
    return this.chatService.findmssgs(n.name);
  }

  @Get('rooms')
  async findrooms(@Query() n: {name: string}): Promise<any[]> {
    var rooms = this.chatService.findAll();
    var user  = this.chatService.getuser(n.name)

    console.log(user?.rooms)
      var tmp= new Array<roooms>()
      user?.rooms?.map((val) => {
        var room = new roooms(val.name);
        room.isdm = val.isdm;
        room.status = val.status;
        room.owner = new User(undefined,val.owner?.user_name)
        val.users.map((tmpuser) => room.users.push(new User(undefined,tmpuser.user_name)))
        val.admins.map((tmpuser)=> room.admins.push(new User(undefined, tmpuser.user_name)))
        room.socketname= val.socketname;
        room.mssg=[val.mssg[val.mssg.length - 1]];
        // val?.banned?.map((tmpban) => room.banned.push(new Banned(tmpban.room, tmpban.user, tmpban.endof)))
        tmp.push(room);
      });

      return tmp;
  }
  @Get('banned')
  async findroom(@Query() n: {name: string}): Promise<any> {
    var rooms = this.chatService.findAll();
    var room  = rooms.find((m) => n.name === m.name)

      var tmp_room = new Array<Banned>()
      room?.banned?.map((ban)=> tmp_room.push(new Banned(ban.room, ban.user_name, ban.endof)))
      return tmp_room;
  }
  
  @Get('users')
  async findusers(): Promise<any[]> {
    return this.chatService.getallusers();
  }
}