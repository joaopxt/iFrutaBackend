import { Injectable } from '@nestjs/common';
import { CreateFormaPagamentoDto } from './dto/create-forma-pagamento.dto';
import { UpdateFormaPagamentoDto } from './dto/update-forma-pagamento.dto';

@Injectable()
export class FormaPagamentoService {
  create(createFormaPagamentoDto: CreateFormaPagamentoDto) {
    return 'This action adds a new formaPagamento';
  }

  findAll() {
    return `This action returns all formaPagamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formaPagamento`;
  }

  update(id: number, updateFormaPagamentoDto: UpdateFormaPagamentoDto) {
    return `This action updates a #${id} formaPagamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} formaPagamento`;
  }
}
