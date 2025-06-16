import { Venda } from 'src/vendas/entities/venda.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Venda, (venda) => venda.status)
  vendas: Venda[];
}
