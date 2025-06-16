import { Venda } from 'src/vendas/entities/venda.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FormaPagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Venda, (venda) => venda.formaPagamento)
  vendas: Venda[];
}
