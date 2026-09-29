import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { LanguageModule } from '../language/language.module';
import { UserLanguageService } from './user-language.service';
import { UserLanguageController } from './user-language.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    LanguageModule,
  ],
  controllers: [UserLanguageController],
  providers: [UserLanguageService],
})
export class UserLanguageModule {}
