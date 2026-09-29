import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LanguageService } from '../language/language.service';

@Injectable()
export class UserLanguageService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly languageService: LanguageService,
  ) {}

  async assignLanguage(userId: number, languageId: number): Promise<User> {
    const user = await this.userService.findOne(userId);
    const language = await this.languageService.findOne(languageId);

    const alreadyAssigned = user.languages.some((l) => l.id === language.id);

    if (alreadyAssigned) {
      throw new ConflictException(
        `Language '${language.name}' is already assigned to user '${user.name}'`,
      );
    }

    user.languages.push(language);
    await this.userRepository.save(user);
    return this.userService.findOne(userId);
  }

  async removeLanguage(userId: number, languageId: number): Promise<User> {
    const user = await this.userService.findOne(userId);
    const language = await this.languageService.findOne(languageId);

    const languageIndex = user.languages.findIndex((l) => l.id === language.id);

    if (languageIndex === -1) {
      throw new NotFoundException(
        `Language '${language.name}' is not assigned to user '${user.name}'`,
      );
    }

    user.languages.splice(languageIndex, 1);
    await this.userRepository.save(user);
    return this.userService.findOne(userId);
  }

  async getUserLanguages(userId: number) {
    const user = await this.userService.findOne(userId);
    return user.languages;
  }
}
