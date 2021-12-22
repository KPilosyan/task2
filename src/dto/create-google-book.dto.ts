import {
    IsString,
    MinLength,
} from 'class-validator'

export default class CreateGoogleBooksDto {
    ///// Standard Query Parameters /////

    @IsString()
    @MinLength(2)
    ingeneral: string;

    @IsString()
    intitle: string;

    @IsString()
    inauthor: string;

    @IsString()
    inpublisher: string;


}
