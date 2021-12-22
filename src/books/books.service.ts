import {
    Injectable, NotFoundException, InternalServerErrorException, Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CreateBookDto from 'src/dto/create-book.dto';
import Book from './book.entity';
import GoogleBook from './gglBook.entity';
import axios from 'axios';
import CreateGoogleBooksDto from 'src/dto/create-google-book.dto';

@Injectable()
export default class BooksService {
    constructor(
        @InjectModel(Book)
        @InjectModel(GoogleBook)
        private readonly gglBookModel: typeof GoogleBook,
    ) { }
    private readonly bookModel: typeof Book;
    private readonly logger = new Logger(BooksService.name);
    private readonly ApiKey = 'AIzaSyBb2TcyqvcET38Vwuo3Lf15HNW9q3UZuOQ';
    private readonly mainUrl = 'https://www.googleapis.com/books/v1/volumes?';

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
            await this.bookModel.update({ title, description, price }, { where: { id: bookId } });

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
            await this.bookModel.destroy({ where: { id: bookId } });
            return bookId;
        } catch (err) {
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }

    async getGoogleBooks(gglBooksDto: CreateGoogleBooksDto): Promise<any> {
        try {
            const selectedData = {};
            const books = await axios.get(`${this.mainUrl}q=${gglBooksDto.ingeneral}
            &intitle:${gglBooksDto.intitle}
            &inauthor:${gglBooksDto.inauthor}
            &inpublisher:${gglBooksDto.inpublisher}
            &key=${this.ApiKey}`);

            const data = books.data.items[0];
            selectedData['id'] = 1;
            selectedData['selfLink'] = data.selfLink;
            selectedData['title'] = data.volumeInfo.title;
            selectedData['authors'] = data.volumeInfo.authors;
            selectedData['publisher'] = data.volumeInfo.publisher;
            selectedData['publishedDate'] = data.volumeInfo.publishedDate;
            selectedData['description'] = data.volumeInfo.description;
            selectedData['pageCount'] = data.volumeInfo.pageCount;
            selectedData['printType'] = data.volumeInfo.printType;
            selectedData['categories'] = data.volumeInfo.categories;
            selectedData['averageRating'] = data.volumeInfo.averageRating;
            selectedData['ratingsCount'] = data.volumeInfo.ratingsCount;
            selectedData['maturityRating'] = data.volumeInfo.maturityRating;
            selectedData['imageLink'] = data.volumeInfo.imageLinks.thumbnail;
            selectedData['language'] = data.volumeInfo.language;
            selectedData['previewLink'] = data.volumeInfo.previewLink;
            selectedData['infoLink'] = data.volumeInfo.infoLink;
            selectedData['canonicalVolumeLink'] = data.volumeInfo.canonicalVolumeLink;
            selectedData['saleInfo_country'] = data.saleInfo.country;
            selectedData['saleability'] = data.saleInfo.saleability;
            selectedData['isEbook'] = data.saleInfo.isEbook;
            selectedData['accessInfo_country'] = data.accessInfo.country;
            selectedData['viewability'] = data.accessInfo.viewability;
            selectedData['publicDomain'] = data.accessInfo.publicDomain;
            selectedData['textToSpeechPermission'] = data.accessInfo.textToSpeechPermission;
            selectedData['download_epub'] = data.accessInfo.epub.isAvailable;
            selectedData['pdf'] = data.accessInfo.pdf.isAvailable;
            selectedData['webReaderLink'] = data.accessInfo.webReaderLink;
            selectedData['accessViewStatus'] = data.accessInfo.accessViewStatus;
            selectedData['quoteSharingAllowed'] = data.accessInfo.quoteSharingAllowed;
            selectedData['textSnippet'] = data.searchInfo.textSnippet;

            await this.gglBookModel.create(selectedData);

            return selectedData;
        } catch (err) {
            console.log(err)
            this.logger.log(err);
            throw new InternalServerErrorException();
        }
    }
}
