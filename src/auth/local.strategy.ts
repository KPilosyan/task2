/* eslint-disable import/no-unresolved */
/* eslint-disable indent */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import CreateUserDto from 'src/dto/create-user.dto';
import AuthService from './auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
    private authService: AuthService;

    async validate(userDto: CreateUserDto): Promise<any> {
        const user = await this.authService.validateUser(userDto);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
