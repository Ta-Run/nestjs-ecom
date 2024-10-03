import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model<User> {
  
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        description: 'The unique email of the user',
        example: 'john.doe@example.com',
        uniqueItems: true,
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @ApiProperty({
        description: 'The password of the user (should be hashed)',
        example: 'securePassword123',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @ApiProperty({
        description: 'The gender of the user',
        example: 'male',
        enum: ['male', 'female'],
    })
    @Column({
        type: DataType.ENUM,
        values: ['male', 'female'],
        allowNull: false,
    })
    gender: string;

    @ApiProperty({
        description: 'The role of the user',
        example: 'Customer',
        enum: ['Customer', 'Admin', 'Seller'],
    })
    @Column({
        type: DataType.ENUM,
        values: ['Customer', 'Admin', 'Seller'],
        allowNull: false,
    })
    roll: string;
}
