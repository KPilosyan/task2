import { Module } from "@nestjs/common";
import { UsersController } from "../controllers/users.controller";
import { UsersService } from "../services/users.service";
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from "models/user.entity";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }