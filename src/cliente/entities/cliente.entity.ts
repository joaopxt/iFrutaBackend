import { Cart } from 'src/carts/entities/cart.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  @Column()
  userId: number;

  @ManyToMany(() => Loja, (loja) => loja.favoritados)
  @JoinTable({ name: 'lojas_favoritas' })
  favoritos: Loja[];

  @OneToMany(() => Cart, (cart) => cart.cliente)
  carts: Cart[];
}
