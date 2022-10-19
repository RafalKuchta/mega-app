import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import {AuthModule} from "./auth/auth.module";
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { SmsModule } from './sms/sms.module';
import { AccessControlModule } from 'nest-access-control';
import {roles} from "./auth/user.roles";
import {ConfigModule} from "@nestjs/config";
import { MailModule } from './mail/mail.module';
import configuration from "./utils/config/configuration";

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: configuration().databaseMaria.host,
          port: configuration().databaseMaria.port,
          username: configuration().databaseMaria.username,
          password: configuration().databaseMaria.password,
          database: configuration().databaseMaria.name,
          entities: ['dist/**/**.entity{.ts,.js}'],
          bigNumberStrings: false,
          logging: true,
          synchronize: true,
      }),
      TasksModule,
      AuthModule,
      UserModule,
      ChatModule,
      SmsModule,
      AccessControlModule.forRoles(roles),
      MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
