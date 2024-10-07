import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Otp extends Model<Otp> {
    @ApiProperty({ description: 'The unique identifier for the OTP entry' })
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ApiProperty({ description: 'The email address associated with the OTP' })
    @Column(DataType.STRING)
    email: string;

    @ApiProperty({ description: 'The OTP code' })
    @Column(DataType.STRING)
    otp: string;

    @ApiProperty({ description: 'The expiration date and time for the OTP' })
    @Column(DataType.DATE)
    expiresAt: Date;
}
