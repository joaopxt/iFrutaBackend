import { Cart } from 'src/carts/entities/cart.entity';
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

  @Column()
  quantity: number;

  @Column()
  subtotal: number;

  @Column()
  produtoId: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn()
  cart: Cart;

  @Column()
  cartId: number;
}
