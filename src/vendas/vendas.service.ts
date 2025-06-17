import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/status/entities/status.entity';
import { Repository } from 'typeorm';
import { Venda } from './entities/venda.entity';
import { FormaPagamento } from 'src/forma-pagamento/entities/forma-pagamento.entity';
import { Cart } from 'src/carts/entities/cart.entity';

@Injectable()
export class VendasService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Venda)
    private readonly vendaRepository: Repository<Venda>,
    @InjectRepository(FormaPagamento)
    private readonly formaPagamentoRepository: Repository<FormaPagamento>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async create(createVendaDto: CreateVendaDto) {
    const cart = await this.cartRepository.findOne({
      where: { id: createVendaDto.cartId },
    });
    if (!cart)
      throw new NotFoundException(
        `Carrinho com id #${createVendaDto.cartId} inexistente!`,
      );

    const venda = await this.vendaRepository.create({
      ...createVendaDto,
      cart,
    });
  }

  findAll() {
    return `This action returns all vendas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venda`;
  }

  update(id: number, updateVendaDto: UpdateVendaDto) {
    return `This action updates a #${id} venda`;
  }

  remove(id: number) {
    return `This action removes a #${id} venda`;
  }
}
