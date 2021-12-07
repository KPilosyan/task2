import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { Book } from '../../models/Book';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
    async insertBook(title: string, description: string, price: number) {
        try {
            const bookPosted = await Book.create({ title, description, price });
            return bookPosted;
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async getBooks() {
        try {
            console.log(Book);
            const books = await Book.findAll();
            return books;
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async getSingleBook(bookId: number) {
        try {
            const book = await Book.findOne({ where: { bookId } });

            if (book === null) {
                throw new NotFoundException();
            }
            return book;
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async updateBook(bookId: number, title: string, description: string, price: number) {
        try {
            const book = await Book.findOne({ where: { bookId } });
            if (book === null) {
                throw new NotFoundException();
            }
            if (title) {
                await Book.update({ title }, { where: { bookId } })
            }
            if (description) {
                await Book.update({ description }, { where: { bookId } })
            }
            if (price) {
                await Book.update({ price }, { where: { bookId } })
            }
            return bookId;
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async deleteBook(bookId: number) {
        try {
            const book = await Book.findOne({ where: { bookId } });
            if (book === null) {
                throw new NotFoundException();
            }
            await Book.destroy({ where: { bookId } })
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }
}