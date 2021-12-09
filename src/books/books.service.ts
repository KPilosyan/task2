import { Injectable, NotFoundException, InternalServerErrorException, Logger } from "@nestjs/common";
import { Book } from '../../models/book.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from "dto/create-book.dto";

@Injectable()
export class BooksService {
    private readonly logger = new Logger(BooksService.name);
    constructor(
        @InjectModel(Book)
        private readonly bookModel: typeof Book,
    ) { }

    async insertBook(bookDto: CreateBookDto): Promise<Book> {
        try {
            const bookPosted = await this.bookModel.create(bookDto);
            return bookPosted;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }

    async getBooks(): Promise<Book[]> {
        try {
            const books = await this.bookModel.findAll();
            return books;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }

    async getSingleBook(bookId: number): Promise<Book> {
        try {
            const book = await this.bookModel.findOne({ where: { id: bookId } });

            if (book === null) {
                throw new NotFoundException();
            }
            return book;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }

    async updateBook(bookId: number, bookDto: CreateBookDto): Promise<number> {
        try {
            const book = await this.bookModel.findOne({ where: { id: bookId } });
            if (book === null) {
                throw new NotFoundException();
            }
            const { title, description, price } = bookDto;
            await this.bookModel.update({ title, description, price }, { where: { id: bookId } })

            return bookId;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }

    async deleteBook(bookId: number): Promise<number> {
        try {
            const book = await this.bookModel.findOne({ where: { id: bookId } });
            if (book === null) {
                throw new NotFoundException();
            }
            await this.bookModel.destroy({ where: { id: bookId } })
            return bookId;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }
}