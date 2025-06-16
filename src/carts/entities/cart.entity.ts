import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Cliente)
  cliente: Cliente;

  @Column()
  clienteId: number;

  @Column({ default: 0.0 })
  valor: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Loja, (loja) => loja.carts)
  @JoinColumn()
  loja: Loja;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}
