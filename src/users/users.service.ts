import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from 'src/dto/create-user.dto';
import User from './user.entity';

@Injectable()
export default class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async insertUser(registerDto: RegisterDto): Promise<User> {
        try {
            const addedUser = await this.userModel.create(registerDto);
            return addedUser;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }

    async getUser(username: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({ where: { username: username } });

            return user;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }
}
