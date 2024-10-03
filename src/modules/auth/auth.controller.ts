import { Controller, Body, Post, UseGuards, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')  // Swagger Tag for grouping
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({ summary: 'Log in with credentials' })  // Swagger operation summary
    @ApiResponse({
        status: 200,
        description: 'Successfully logged in',
        schema: {
            example: {
                user: {
                    id: 1,
                    name: 'test',
                    email: 'johndoe@example.com',
                    gender: 'male',
                    roll: 'Customer',
                },
                token: 'jwt-token-string',
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @ApiBody({
        description: 'Login credentials',
        schema: {
            example: {
                email: 'test@gmail.com',
                password: 'password123',
            },
        },
    })
    async login(@Body() req) {
        this.logger.info(`User ${req.user.email} is logging in.`);
        return await this.authService.login(req.user);
    }

    @Post('signup')
    @ApiOperation({ summary: 'Sign up a new user' })  // Swagger operation summary
    @ApiResponse({
        status: 201,
        description: 'Successfully signed up',
        schema: {
            example: {
                user: {
                    id: 1,
                    name: 'test',
                    email: 'test@example.com',
                    gender: 'male',
                    roll: 'Customer',
                    createdAt: '2024-10-03T10:23:36.240Z',
                    updatedAt: '2024-10-03T10:23:36.240Z',
                },
                token: 'jwt-token-string',
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({
        description: 'User registration details',
        type: UserDto,  // Uses DTO to describe the input
    })
    async signUp(@Body() user: UserDto) {
        try {
            this.logger.info(`Creating a new user with email: ${user.email}`);
            const newUser = await this.authService.create(user);
            return newUser;
        } catch (error) {
            this.logger.error(`Error creating user: ${error.message}`);
            throw error;
        }
    }
}
