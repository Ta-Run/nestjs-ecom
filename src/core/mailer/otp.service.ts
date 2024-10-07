import { Inject, Injectable } from '@nestjs/common';
import { Otp } from './otp.entity';
import { OTP_REPSOITORY } from '../database/constant/index'; // Make sure it's spelled correctly

@Injectable()
export class OtpService {
    constructor(
        @Inject(OTP_REPSOITORY) private readonly otpRepository: typeof Otp // Ensure this is correct
    ) {}

    async storeOtp(email: string, otp: string, expiresAt: Date): Promise<void> {
        // Directly create and save the OTP entry
        await this.otpRepository.create({ email, otp, expiresAt });
    }

    async validateOtp(email: string, otp: string): Promise<boolean> {
        const entry = await this.otpRepository.findOne({ where: { email, otp } });
        
        // Check if the entry exists and is not expired
        if (!entry || entry.expiresAt < new Date()) {
            return false; // OTP is invalid or expired
        }

        // Delete the OTP after validation
        await this.otpRepository.destroy({ where: { id: entry.id } }); // Use destroy instead of delete
        return true; // OTP is valid
    }
}
