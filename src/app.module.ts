import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { ProductModule } from './modules/product/product.module';
import { MailerModule } from '@nestjs-modules/mailer';
import * as winston from 'winston';
import { NodeMailerModule } from './core/mailer/nodemailer.module';

@Module({
  imports: [
    AdminModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    MailerModule,
    NodeMailerModule,
    ConfigModule.forRoot(),
    WinstonModule.forRoot({
      transports: [
      
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      
        new winston.transports.File({
          filename: 'logs/app.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(), 
          ),
        }),
      ],
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
