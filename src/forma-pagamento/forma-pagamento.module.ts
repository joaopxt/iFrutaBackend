import { Module } from '@nestjs/common';
import { FormaPagamentoService } from './forma-pagamento.service';
import { FormaPagamentoController } from './forma-pagamento.controller';

@Module({
  controllers: [FormaPagamentoController],
  providers: [FormaPagamentoService],
})
export class FormaPagamentoModule {}
