import {
    Controller, Get, Post, Body, Param, Put, Delete, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import CreateBookDto from 'src/dto/create-book.dto';
import Book from './book.entity';
import BooksService from './books.service';

@Controller('books')
export default class BooksController {
    constructor(private readonly bookService: BooksService) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    async addBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        const generatedBookId = this.bookService.insertBook(createBookDto);
        return generatedBookId;
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    async getAllBooks(): Promise<Book[]> {
        return this.bookService.getBooks();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(':id')
    async getBook(@Param('id') bookId: number): Promise<Book> {
        return this.bookService.getSingleBook(bookId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    async updateBook(@Param('id') bookId: number, @Body() createBookDto: CreateBookDto): Promise<number> {
        const updatedBookId = this.bookService.updateBook(bookId, createBookDto);
        return updatedBookId;
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    async removeBook(@Param('id') bookId: number): Promise<number> {
        return this.bookService.deleteBook(bookId);
    }
}
