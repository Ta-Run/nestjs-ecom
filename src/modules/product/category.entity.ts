// src/modules/category/category.model.ts
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Category extends Model<Category> {
    @Column
    name: string;

    @Column
    description: string;
}
