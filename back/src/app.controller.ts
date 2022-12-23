import { Controller, Get, Post, Body,Query } from '@nestjs/common';
import { Mssgdto } from './dto/mssg.dto';
import { RoomService } from './app.service';
import { Mssg, Room, roooms, User} from './mssg.interface';
import { Logger } from '@nestjs/common';

@Controller('app')
export class appController {
  constructor(private chatService: RoomService) {}
  
  logger: Logger = new Logger('AppGateway');
  @Post()
  async create(@Body() createMssgDto: Mssg): Promise<void> {
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
  async findrooms(): Promise<any[]> {
    var rooms = this.chatService.findAll();
      var tmp= new Array<roooms>()
      rooms.map((val) => {
        var room = new roooms(val.name);
        room.mssg=[val.mssg[val.mssg.length - 1]];
        tmp.push(room);
      });
      return tmp;
  }
  
  @Get('users')
  async findusers(): Promise<any[]> {
    return this.chatService.getallusers();
  }
}