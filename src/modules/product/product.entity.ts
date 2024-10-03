import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    imagePath: string;
}
