import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class User extends Model {
  @Column
  username: string;

  unique: true;

  @Column
  password: string;
}
