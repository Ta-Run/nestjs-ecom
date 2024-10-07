import { Controller, Post, Body } from "@nestjs/common";
import { MailService } from "./nodemailer.service";

@Controller('mailer')
export class MailerController {
    constructor(private readonly mailService: MailService) { }

    @Post('send') // Create an endpoint to trigger sending an email
    async sendMail(@Body() body: { to: string; subject: string; text: string; html: string }) {
        try {
            // Call the MailService to send the email
            const info = await this.mailService.sendOtpEmail(body.to, body.subject);
            return { success: true, };
        } catch (error) {
            console.error('Error sending email:', error);
            return { success: false, error: error.message };
        }
    }
}
