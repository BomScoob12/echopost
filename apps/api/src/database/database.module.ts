import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('database.host');
        const port = configService.get<string>('database.port');
        const dbName = configService.get<string>('database.name');
        const user = configService.get<string>('database.user');
        const pass = configService.get<string>('database.pass');

        const mongoUri = `mongodb://${user}:${pass}@${host}:${port}/${dbName}`;
        return { uri: mongoUri };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
