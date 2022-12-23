import { Module } from '@nestjs/common';
import { appController } from './app.controller';
import { RoomService } from './app.service';
import { AppGateway } from './app.gateway';

@Module({
  imports: [],
  controllers: [appController],
  providers: [RoomService,AppGateway],
})
export class AppModule {
  
}
