// src/modules/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    controllers: [AdminController],
    providers: [AdminService],
    imports: [],
    exports: [],
})
export class AdminModule {}
