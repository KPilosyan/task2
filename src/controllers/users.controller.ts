/* eslint-disable import/no-unresolved */
/* eslint-disable indent */
import {
    Controller, Post, Body, UseGuards,
} from '@nestjs/common';
import LocalAuthGuard from 'src/auth/local-auth.guard';
// import LocalStrategy from 'src/auth/local.strategy';
import User from 'src/models/user.entity';
// import { IsEmail } from "sequelize-typescript";
// import passport from "passport";
import CreateUserDto from '../dto/create-user.dto';
import UsersService from '../services/users.service';

@Controller('')
export default class UsersController {
    private readonly userService: UsersService;

    @Post('register')
    register(@Body() userDto: CreateUserDto): Promise<User> {
        const userId = this.userService.insertUser(userDto);
        return userId;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() userDto: CreateUserDto): Promise<string> {
        const { name } = userDto;
        const userInfo = await this.userService.getUser(name);
        return `Welcome ${userInfo.name}`;
    }
}
