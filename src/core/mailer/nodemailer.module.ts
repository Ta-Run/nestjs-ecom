import { Module } from '@nestjs/common';
import { MailService } from './nodemailer.service';
import { OtpModule } from './otp.module';

@Module({
    providers: [MailService],       
    exports: [MailService],
    imports:[OtpModule]
    
})
export class NodeMailerModule {}
