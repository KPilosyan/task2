/* eslint-disable import/no-unresolved */
/* eslint-disable indent */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import User from 'src/models/user.entity';
import UsersController from '../controllers/users.controller';
import UsersService from '../services/users.service';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    exports: [UsersService],
    controllers: [UsersController],
    providers: [UsersService],
})
export default class UsersModule { }
