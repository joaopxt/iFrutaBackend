import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { Status } from 'src/status/entities/status.entity';
import { FormaPagamento } from 'src/forma-pagamento/entities/forma-pagamento.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { Loja } from 'src/loja/entities/loja.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venda, Status, Loja, FormaPagamento, Cart]),
  ],
  controllers: [VendasController],
  providers: [VendasService],
})
export class VendasModule {}
