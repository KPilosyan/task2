import { Injectable, NotFoundException, InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from '../../models/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from "dto/create-user.dto";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) { }

    async insertUser(userDto: CreateUserDto): Promise<User> {
        try {
            const userPosted = await this.userModel.create(userDto);
            return userPosted;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            const users = await this.userModel.findAll();
            return users;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }

    async getSingleUser(userId: number): Promise<User> {
        try {
            const user = await this.userModel.findOne({ where: { id: userId } });

            if (user === null) {
                throw new NotFoundException();
            }
            return user;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }

    async updateUser(userId: number, userDto: CreateUserDto): Promise<number> {
        try {
            const user = await this.userModel.findOne({ where: { id: userId } });
            if (user === null) {
                throw new NotFoundException();
            }
            const { name, email, password } = userDto;
            await this.userModel.update({ name, email, password }, { where: { id: userId } })

            return userId;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }

    async deleteUser(userId: number): Promise<number> {
        try {
            const user = await this.userModel.findOne({ where: { id: userId } });
            if (user === null) {
                throw new NotFoundException();
            }
            await this.userModel.destroy({ where: { id: userId } })
            return userId;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }
}