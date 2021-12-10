import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksModule } from './modules/books.module';
import { UsersModule } from './modules/users.module';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 3400,
            username: 'karen',
            password: 'password',
            database: 'books',
            autoLoadModels: true,
            synchronize: true,
        }),
        BooksModule,
        UsersModule,
    ],
})
export class AppModule { }