import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigsModule } from './configs/configs.module';

@Module({
  imports: [UsersModule, ConfigsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
