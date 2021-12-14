/* eslint-disable import/no-unresolved */
/* eslint-disable indent */
import {
    Controller, Get, Post, Body, Param, Put, Delete,
} from '@nestjs/common';
import CreateBookDto from 'src/dto/create-book.dto';
import Book from 'src/models/book.entity';
import BooksService from '../services/books.service';

@Controller('books')
export default class BooksController {
    private readonly bookService: BooksService;

    @Post()
    addBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        const generatedBookId = this.bookService.insertBook(createBookDto);
        return generatedBookId;
    }

    @Get()
    getAllBooks(): Promise<Book[]> {
        return this.bookService.getBooks();
    }

    @Get(':id')
    getBook(@Param('id') bookId: number): Promise<Book> {
        return this.bookService.getSingleBook(bookId);
    }

    @Put(':id')
    updateBook(@Param('id') bookId: number, @Body() createBookDto: CreateBookDto): Promise<number> {
        const updatedBookId = this.bookService.updateBook(bookId, createBookDto);
        return updatedBookId;
    }

    @Delete(':id')
    removeBook(@Param('id') bookId: number): Promise<number> {
        return this.bookService.deleteBook(bookId);
    }
}
