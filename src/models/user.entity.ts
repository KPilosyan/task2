/* eslint-disable indent */
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class User extends Model {
  @Column
  name: string;

  unique: true;

  @Column
  email: string;

  @Column
  password: string;
}
