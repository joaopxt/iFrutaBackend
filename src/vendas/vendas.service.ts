import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/status/entities/status.entity';
import { Repository } from 'typeorm';
import { Venda } from './entities/venda.entity';
import { FormaPagamento } from 'src/forma-pagamento/entities/forma-pagamento.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { Loja } from 'src/loja/entities/loja.entity';

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
    @InjectRepository(Loja)
    private readonly lojaRepository: Repository<Loja>,
  ) {}

  async create(createVendaDto: CreateVendaDto) {
    const cart = await this.cartRepository.findOne({
      where: { id: createVendaDto.cartId },
    });
    if (!cart)
      throw new NotFoundException(
        `Carrinho com id #${createVendaDto.cartId} inexistente!`,
      );

    const status = await this.statusRepository.findOne({
      where: { id: 1 },
    });
    if (!status) throw new NotFoundException(`Status inválido`);

    const loja = await this.lojaRepository.findOne({
      where: { id: cart.lojaId },
    });

    if (!loja)
      throw new NotFoundException(
        `Essa venda não pode ser criada! Loja com id #${cart.lojaId} inexistente`,
      );

    const formaPagamento = await this.formaPagamentoRepository.findOne({
      where: { id: createVendaDto.formaPagamentoId },
    });
    if (!formaPagamento)
      throw new NotFoundException('Forma pagamento inválida');

    const venda = await this.vendaRepository.create({
      ...createVendaDto,
      cart,
      status,
      formaPagamento,
      loja,
    });

    return await this.vendaRepository.save(venda);
  }

  async findAllVendasLoja(id: number) {
    const loja = await this.lojaRepository.findOne({
      where: { id },
      relations: ['vendas', 'carts', 'produtos'],
    });

    if (!loja) throw new NotFoundException(`Loja #${id} inexistente`);

    return loja.vendas;
  }

  async findOne(id: number) {
    const venda = await this.vendaRepository.findOne({ where: { id } });

    if (!venda) throw new NotFoundException(`Venda #${id} não encontrada`);

    return venda;
  }

  async update(id: number, updateVendaDto: UpdateVendaDto) {
    await this.findOne(id);
    await this.vendaRepository.update(id, updateVendaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.vendaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Venda com id: ${id} não encontrada`);
    }
  }
}
