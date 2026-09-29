import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LanguageModule } from './language/language.module';
import { UserLanguageModule } from './user-language/user-language.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    LanguageModule,
    UserLanguageModule,
  ],
})
export class AppModule {}
