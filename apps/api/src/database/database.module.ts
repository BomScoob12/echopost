import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('MONGO_DB_HOST');
        const port = configService.get<string>('MONGO_DB_PORT');
        const dbName = configService.get<string>('MONGO_DB_NAME');
        const user = configService.get<string>('MONGO_DB_USER');
        const pass = configService.get<string>('MONGO_DB_PASS');
        const mongoUri = `mongodb://${user}:${pass}@${host}:${port}/${dbName}`;
        return {
          uri: mongoUri,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
