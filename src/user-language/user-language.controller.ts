import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserLanguageService } from './user-language.service';
import { AssignLanguageDto } from './dto/assign-language.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { LanguageResponseDto } from '../language/dto/language-response.dto';

@Controller('user-languages')
export class UserLanguageController {
  constructor(private readonly userLanguageService: UserLanguageService) {}

  @Post()
  async assignLanguage(@Body() assignLanguageDto: AssignLanguageDto): Promise<UserResponseDto> {
    const user = await this.userLanguageService.assignLanguage(
      assignLanguageDto.userId,
      assignLanguageDto.languageId,
    );
    return plainToInstance(UserResponseDto, user);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async removeLanguage(@Body() assignLanguageDto: AssignLanguageDto): Promise<UserResponseDto> {
    const user = await this.userLanguageService.removeLanguage(
      assignLanguageDto.userId,
      assignLanguageDto.languageId,
    );
    return plainToInstance(UserResponseDto, user);
  }

  @Get('user/:userId')
  async getUserLanguages(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<LanguageResponseDto[]> {
    const languages = await this.userLanguageService.getUserLanguages(userId);
    return plainToInstance(LanguageResponseDto, languages);
  }
}
