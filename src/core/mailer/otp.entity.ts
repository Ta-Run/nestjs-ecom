import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('otp')
export class OtpEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    otp: string;

    @Column()
    expiresAt: Date; // To store the expiration time
}
