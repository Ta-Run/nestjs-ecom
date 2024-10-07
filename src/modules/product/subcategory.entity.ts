// src/modules/subcategory/subcategory.model.ts
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';

@Table
export class Subcategory extends Model<Subcategory> {
    @ForeignKey(() => Category)
    @Column
    categoryId: number;

    @Column
    name: string;

    @Column
    description: string;
}
