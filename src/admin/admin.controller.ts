import { Body, Controller, Get, Post,RawBody } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(private adminService:AdminService){}

    @Get('login')
    async login(@ RawBody()req) {
      console.log('req',req)
      return 'check users'
    }
}
