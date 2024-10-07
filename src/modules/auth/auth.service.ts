import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailService } from 'src/core/mailer/nodemailer.service';

@Injectable()
export class AuthService {                                                                               
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        
    ) { }

    async validateUser(email: string, pass: string) {
        
        
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return null;
        }
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }
        const { password, ...result } = user['dataValues'];
        return result;
    }

    public async login(email,password) {
        console.log(email,password,'service')
        const token = await this.generateToken(email);
        console.log(email,password,'token')
        return { email,password, token };
    }

    public async create(user) {

        console.log('user',user)
        const pass = await this.hashPassword(user.password);

        const newUser = await this.userService.create({ ...user, password: pass });
        await this.mailService.sendOtpEmail(user.email,user.name)
        

        const { password, email } = newUser['dataValues'];


        const token = await this.generateToken(email);

        return { user: email,password, token };
    }

    private async generateToken(email) {
        const payload = { email }; 
        const token = await this.jwtService.signAsync(payload);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}