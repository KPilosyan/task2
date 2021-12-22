import {
    Controller, Post, Body, Request, UseGuards,
} from '@nestjs/common';
import User from '../users/user.entity';
import LocalAuthGuard from 'src/auth/local-auth.guard';
import { LoginDto, RegisterDto } from '../dto/create-user.dto';
import UsersService from '../users/users.service';
import AuthService from './auth.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller()
export default class AuthController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    @ApiCreatedResponse({ description: 'User Registration' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() registerDto: RegisterDto): Promise<User> {
        const userId = this.userService.insertUser(registerDto);
        return userId;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOkResponse({ description: 'User login' })
    @ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
    @ApiBody({ type: LoginDto })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
