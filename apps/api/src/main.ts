import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3000;

  app.use(cookieParser());
  await app.listen(port);

  console.log('App Name:', configService.get<string>('app.name'));
  console.log('App Version:', configService.get<string>('app.version'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
