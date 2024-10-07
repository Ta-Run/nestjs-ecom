import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpEntity } from './otp.entity';

@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(OtpEntity)
        private readonly otpRepository: Repository<OtpEntity>,
    ) {}

    async storeOtp(email: string, otp: string, expiresAt: Date): Promise<void> {
        const otpEntry = this.otpRepository.create({ email, otp, expiresAt });
        await this.otpRepository.save(otpEntry);
    }

    async validateOtp(email: string, otp: string): Promise<boolean> {
        const entry = await this.otpRepository.findOne({ where: { email, otp } });
        if (!entry || entry.expiresAt < new Date()) {
            return false; // OTP is invalid or expired
        }
        await this.otpRepository.delete(entry.id); // Optionally delete OTP after validation
        return true; // OTP is valid
    }
}
