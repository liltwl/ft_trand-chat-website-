import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.use(cookieParser());
  // app.useStaticAssets(join(__dirname, '..', 'static'));
  // app.enableCors({
  //   origin: ['http://localhost:8080', 'http://localhost'],
  //   credentials: true,
  // });
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
