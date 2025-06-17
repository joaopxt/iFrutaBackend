import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Produto } from 'src/produtos/entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Repository } from 'typeorm';
import { Loja } from 'src/loja/entities/loja.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(Loja)
    private readonly lojaRepository: Repository<Loja>,
  ) {}

  async create(createCartDto: CreateCartDto, produtoId: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id: createCartDto.clienteId },
    });

    if (!cliente)
      throw new NotFoundException(
        `Cliente com id #${createCartDto.clienteId} não encontrado!`,
      );

    const loja = await this.lojaRepository.findOne({
      where: { id: createCartDto.lojaId },
    });
    if (!loja)
      throw new NotFoundException(
        `Loja com id #${createCartDto.lojaId} não encontrada!`,
      );

    const produto = await this.produtoRepository.findOne({
      where: { id: produtoId },
    });
    if (!produto)
      throw new NotFoundException(
        `Produto com id #${produtoId} não encontrado!`,
      );

    if (loja.id !== produto.lojaId)
      throw new Error('O produto não pertence à loja associada ao carrinho!');

    const cart = this.cartRepository.create({
      ...createCartDto,
      cliente,
      loja,
    });

    return this.cartRepository.save(cart);
  }

  findAll() {
    return `This action returns all carts`;
  }

  async findOne(id: number) {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!cart) {
      throw new NotFoundException(`Carrinho com id: ${id} não encontrado`);
    }
    return cart;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
