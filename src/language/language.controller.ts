import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageResponseDto } from './dto/language-response.dto';

@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  async create(@Body() createLanguageDto: CreateLanguageDto): Promise<LanguageResponseDto> {
    const language = await this.languageService.create(createLanguageDto);
    return plainToInstance(LanguageResponseDto, language);
  }

  @Get()
  async findAll(): Promise<LanguageResponseDto[]> {
    const languages = await this.languageService.findAll();
    return plainToInstance(LanguageResponseDto, languages);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<LanguageResponseDto> {
    const language = await this.languageService.findOne(id);
    return plainToInstance(LanguageResponseDto, language);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ): Promise<LanguageResponseDto> {
    const language = await this.languageService.update(id, updateLanguageDto);
    return plainToInstance(LanguageResponseDto, language);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.languageService.remove(id);
  }
}
