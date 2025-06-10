import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dataNascimento: string;

  @Column()
  celular: number;

  @Column()
  endereco: string;

  @Column()
  cpf: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
