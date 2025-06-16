import { Cart } from 'src/carts/entities/cart.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { User } from 'src/user/entities/user.entity';
import { Venda } from 'src/vendas/entities/venda.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
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

  @OneToMany(() => Produto, (produto) => produto.loja)
  produtos: Produto[];

  @ManyToMany(() => Cliente, (cliente) => cliente.favoritos)
  favoritados: Cliente[];

  @OneToMany(() => Cart, (cart) => cart.loja)
  carts: Cart[];

  @OneToMany(() => Venda, (venda) => venda.loja)
  vendas: Venda[];
}
