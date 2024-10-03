import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin';

@Module({
  controllers: [AdminController],
  providers: [AdminService, Admin]
})
export class AdminModule {}
