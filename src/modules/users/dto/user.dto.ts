import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator'
enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

enum Roll {
    Customer = 'customer',
    Admin = 'admin',
    Seller = 'seller'
}
export class UserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either male or female',
    })
    readonly gender: Gender;

    @IsNotEmpty()
    @IsEnum(Roll, {
        message: 'roll must be either Customer, Admin, or Seller',
    })
    readonly roll: Roll;
}