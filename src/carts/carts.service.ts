import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Produto } from 'src/produtos/entities/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Repository } from 'typeorm';
import { Loja } from 'src/loja/entities/loja.entity';
import { CartItemsService } from 'src/cart-items/cart-items.service';

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
    private readonly cartItemsService: CartItemsService,
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
    return this.cartRepository.find();
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

  async update(id: number, updateCartDto: UpdateCartDto) {
    await this.findOne(id);
    await this.cartRepository.update(id, updateCartDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.cartRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Carrinho com id: ${id} não encontrado`);
    }
  }

  async addItemToCart(cartId: number, produtoId: number, quantity: number) {
    const cart = await this.findOne(cartId);

    const produto = await this.produtoRepository.findOne({
      where: { id: produtoId },
    });
    if (!produto) {
      throw new NotFoundException(`Produto com id: ${cartId} não encontrado`);
    }

    if (!quantity || quantity < 0)
      throw new Error('Você precisa inserir ao menos 1 item ao carrinho');

    const item = await this.cartItemsService.create({
      cartId,
      produtoId,
      quantity,
    });

    cart.valor = cart.valor + item.subtotal;
    console.log('Valor do carrinho: ', cart.valor);
    this.cartRepository.save(cart);

    return item;
  }
}
