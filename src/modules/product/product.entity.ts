import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Subcategory } from './subcategory.entity';
@Table
export class Product extends Model<Product> {

    @ForeignKey(() => Subcategory)
    @Column
    subcategoryId: number;

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
