import { IsString, IsOptional } from 'class-validator';

export class UpdateLanguageDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;
}
