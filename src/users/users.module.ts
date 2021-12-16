
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import User from 'src/users/user.entity';
import UsersService from './users.service';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    exports: [UsersService],
    providers: [UsersService],
})
export default class UsersModule { }
