/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-unresolved */
/* eslint-disable indent */
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CreateUserDto from 'src/dto/create-user.dto';
import User from '../models/user.entity';

@Injectable()
export default class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) { }

    async insertUser(userDto: CreateUserDto): Promise<User> {
        try {
            const addedUser = await this.userModel.create(userDto);
            return addedUser;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }

    async getUser(name: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({ where: { name } });

            return user;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }
}
