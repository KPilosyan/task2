import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "models/user.entity";
import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        const generatedUserId = this.userService.insertUser(createUserDto);
        return generatedUserId;
    }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id') userId: number): Promise<User> {
        return this.userService.getSingleUser(userId)
    }

    @Put(':id')
    updateUser(@Param('id') userId: number, @Body() createUserDto: CreateUserDto): Promise<number> {
        const updatedUserId = this.userService.updateUser(userId, createUserDto);
        return updatedUserId;
    }

    @Delete(':id')
    removeUser(@Param('id') userId: number): Promise<number> {
        return this.userService.deleteUser(userId);
    }
}