/* eslint-disable import/no-unresolved */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import UsersModule from 'src/modules/users.module';
import AuthService from './auth.service';
import LocalStrategy from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export default class AuthModule { }
