/* eslint-disable import/no-unresolved */
/* eslint-disable indent */
import { Injectable } from '@nestjs/common';
import UsersService from 'src/services/users.service';
import CreateUserDto from '../dto/create-user.dto';

@Injectable()
export default class AuthService {
    private usersService: UsersService;

    async validateUser(userDto: CreateUserDto): Promise<any> {
        const { name, password } = userDto;
        const user = await this.usersService.getUser(name);
        if (user && user.password === password) {
            return name;
        }
        return null;
    }
}
