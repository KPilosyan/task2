import { Injectable, NotFoundException } from "@nestjs/common";
import { Book } from './books.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
    books: Book[] = [];

    insertBook(title: string, description: string, price: number) {
        const bookId = uuidv4();
        const newBook = new Book(bookId, title, description, price);
        this.books.push(newBook);
        return bookId;
    }

    getBooks() {
        return [...this.books];
    }

    getSingleBook(bookId: string) {
        const book = this.findBook(bookId)[0];
        return { ...book };
    }

    updateBook(bookId: string, title: string, description: string, price: number) {
        const [book, bookIndex] = this.findBook(bookId);
        const updatedBook = { ...book };
        if (title) {
            updatedBook.title = title;
        }
        if (description) {
            updatedBook.description = description;
        }
        if (price) {
            updatedBook.price = price;
        }
        this.books[bookIndex] = updatedBook;

        return this.books[bookIndex];
    }

    deleteBook(bookId: string) {
        const index = this.findBook(bookId)[1];
        this.books.splice(index, 1);
    }

    private findBook(id: string): [Book, number] {
        const bookIndex = this.books.findIndex((b) => b.id === id);
        const book = this.books[bookIndex];
        if (!book) {
            throw new NotFoundException();
        }
        return [book, bookIndex];
    }
}