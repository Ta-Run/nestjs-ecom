import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { OtpService } from './otp.service';

@Injectable()
export class MailService {
    private transporter;
   

    constructor(

        private readonly otpService:OtpService
    ) {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email', // Replace with your SMTP host
            port: 587, // Replace with your SMTP port
            secure: false,
            auth: {
                user: "t.sharma@braininventory.com",
                pass: "rbpvxcgfsxhryofx",
            },
        });
    }

    async sendOtpEmail(to: string, userName: string) {
        const otp = this.generateRandomOTP();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5); // Set expiration to 5 minutes from now
    
        // Store the OTP in the database (Assuming you have an OTP repository/service)
        await this.otpService.storeOtp(to, otp, expiresAt); // You need to implement this in your OTP service
    
        const mailOptions = {
            from: 't.sharma@braininventory.com', // Sender address
            to: to, // Recipient address
            subject: 'Your OTP Code', // Subject line
            text: `Your OTP is ${otp}. It will expire in 5 minutes.`, // Plain text body
            html: `<b>Your OTP is ${otp}</b><br><p>It will expire in 5 minutes.</p>`, // HTML body
        };
    
        try {
            await this.transporter.sendMail(mailOptions);
            console.log('OTP email sent to:', to);
        } catch (error) {
            console.error('Error sending OTP email:', error);
        }
    }
    

    generateRandomOTP(): string {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit OTP
    }

    
    
}

