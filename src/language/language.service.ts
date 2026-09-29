import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const existingLanguage = await this.languageRepository.findOne({
      where: { name: createLanguageDto.name },
    });

    if (existingLanguage) {
      throw new ConflictException(`Language '${createLanguageDto.name}' already exists`);
    }

    const language = this.languageRepository.create(createLanguageDto);
    return this.languageRepository.save(language);
  }

  async findAll(): Promise<Language[]> {
    return this.languageRepository.find();
  }

  async findOne(id: number): Promise<Language> {
    const language = await this.languageRepository.findOne({
      where: { id },
    });

    if (!language) {
      throw new NotFoundException(`Language with id ${id} not found`);
    }

    return language;
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto): Promise<Language> {
    const language = await this.findOne(id);

    if (updateLanguageDto.name && updateLanguageDto.name !== language.name) {
      const existingLanguage = await this.languageRepository.findOne({
        where: { name: updateLanguageDto.name },
      });

      if (existingLanguage) {
        throw new ConflictException(`Language '${updateLanguageDto.name}' already exists`);
      }
    }

    Object.assign(language, updateLanguageDto);
    return this.languageRepository.save(language);
  }

  async remove(id: number): Promise<void> {
    const language = await this.findOne(id);
    await this.languageRepository.remove(language);
  }
}
