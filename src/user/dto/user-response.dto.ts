import { Exclude, Expose, Type } from 'class-transformer';

class LanguageSummaryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  @Type(() => LanguageSummaryDto)
  languages: LanguageSummaryDto[];
}
