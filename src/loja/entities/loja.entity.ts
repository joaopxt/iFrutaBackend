import { Produto } from 'src/produtos/entities/produto.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Loja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cnpj: number;

  @Column()
  nome: string;

  @Column()
  horarioFuncionamento: string;

  @Column()
  endereco: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @ManyToMany(() => Produto, (produto) => produto.lojas)
  @JoinTable()
  produtos: Produto[];
}
