import { Cart } from 'src/carts/entities/cart.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  quantity: number;

  @Column()
  subtotal: number;

  @ManyToOne(() => Produto, (produto) => produto.cartItems)
  @JoinColumn()
  produto: Produto;

  @Column()
  produtoId: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { nullable: false })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @Column()
  cartId: number;
}
