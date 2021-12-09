import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Book extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  price: number;
}