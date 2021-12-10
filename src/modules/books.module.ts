import { Module } from "@nestjs/common";
import { BooksController } from "../controllers/books.controller";
import { BooksService } from "../services/books.service";
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from "models/book.entity";

@Module({
    imports: [SequelizeModule.forFeature([Book])],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule { }