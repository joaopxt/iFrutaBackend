import { Cart } from 'src/carts/entities/cart.entity';
import { FormaPagamento } from 'src/forma-pagamento/entities/forma-pagamento.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { Status } from 'src/status/entities/status.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  endereco: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @Column()
  cartId: number;

  @ManyToOne(() => FormaPagamento, (forma) => forma.vendas)
  formaPagamento: FormaPagamento;

  @Column()
  formaPagamentoId: number;

  @ManyToOne(() => Status, (status) => status.vendas)
  status: Status;

  @Column()
  statusId: number;

  @ManyToOne(() => Loja, (loja) => loja.vendas)
  loja: Loja;
}
