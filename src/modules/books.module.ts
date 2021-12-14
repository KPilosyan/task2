/* eslint-disable import/no-unresolved */
/* eslint-disable indent */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Book from 'src/models/book.entity';
import BooksController from '../controllers/books.controller';
import BooksService from '../services/books.service';

@Module({
    imports: [SequelizeModule.forFeature([Book])],
    controllers: [BooksController],
    providers: [BooksService],
})
export default class BooksModule { }
