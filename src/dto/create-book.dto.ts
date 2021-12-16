import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    MinLength,
} from 'class-validator'

export default class CreateBookDto {
    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'title' })
    title: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'description' })
    description: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'price' })
    price: number;
}
