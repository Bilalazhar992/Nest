import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignLanguageDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  languageId: number;
}
