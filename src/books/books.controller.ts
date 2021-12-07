import { Controller, Get, Post, Body, Param, Patch, Delete } from "@nestjs/common";
import { BooksService } from "./books.service";

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService) { }

    @Post()
    addBook(@Body('title') bookTitle: string, @Body('description') bookDescription: string, @Body('price') bookPrice: number) {
        const generatedBookId = this.bookService.insertBook(bookTitle, bookDescription, bookPrice);
        return { id: generatedBookId };
    }

    @Get()
    getAllBooks() {
        return this.bookService.getBooks();
    }

    @Get(':id')
    getBook(@Param('id') bookId: number) {
        return this.bookService.getSingleBook(bookId)
    }

    @Patch(':id')
    updateBook(@Param('id') bookId: number, @Body('title') bookTitle: string, @Body('description') bookDescription: string, @Body('price') bookPrice: number) {
        const updatedBook = this.bookService.updateBook(bookId, bookTitle, bookDescription, bookPrice);
        return updatedBook;
    }

    @Delete(':id')
    removeBook(@Param('id') bookId: number) {
        this.bookService.deleteBook(bookId);
        return null;
    }
}