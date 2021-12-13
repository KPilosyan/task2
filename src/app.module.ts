/* eslint-disable import/no-unresolved */
/* eslint-disable indent */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import BooksModule from './modules/books.module';
import UsersModule from './modules/users.module';
import AuthModule from './auth/auth.module';

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
        AuthModule,
    ],
})
export default class AppModule { }
