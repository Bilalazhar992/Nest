import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Language } from '../../language/entities/language.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => Language, (language) => language.users, { cascade: true })
  @JoinTable({
    name: 'user_languages',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'language_id', referencedColumnName: 'id' },
  })
  languages: Language[];
}
