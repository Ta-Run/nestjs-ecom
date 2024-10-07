import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { otpProvider } from './otp.provider';


@Module({
    providers: [OtpService,...otpProvider],
    exports: [OtpService],
})
export class OtpModule {}
