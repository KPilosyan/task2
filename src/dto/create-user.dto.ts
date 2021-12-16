import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    MinLength,
} from 'class-validator'

export class LoginDto {
    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'username' })
    username: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'password' })
    password: string;
}

export class RegisterDto {
    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'username' })
    username: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'password' })
    password: string;
}