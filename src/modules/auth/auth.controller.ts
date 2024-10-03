import { Controller, Body, Post, UseGuards, Request, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() req) {
        this.logger.info(`User ${req.user.email} is logging in.`);
        return await this.authService.login(req.user);
    }

    @Post('signup')
    async signUp(@Body() user: UserDto) {
        try {
            this.logger.info(`Creating a new user with email: ${user.email}`);
            const newUser = await this.authService.create(user);
            return newUser;
        } catch (error) {
            this.logger.error(`Error creating user: ${error.message}`);
            throw error;  // You might want to customize the error handling here
        }
    }
}
