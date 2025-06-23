import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from 'src/carts/entities/cart.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    const produto = await this.produtoRepository.findOne({
      where: { id: createCartItemDto.produtoId },
    });

    if (!produto)
      throw new NotFoundException(
        `Produto com id #${createCartItemDto.produtoId} não encontrado!`,
      );

    const cart = await this.cartRepository.findOne({
      where: { id: createCartItemDto.cartId },
    });

    if (!cart)
      throw new NotFoundException(
        `Carrinho com id #${createCartItemDto.cartId} não encontrado!`,
      );

    const cartItem = this.cartItemRepository.create({
      produto,
      produtoId: createCartItemDto.produtoId,
      cart,
      cartId: createCartItemDto.cartId,
      quantity: createCartItemDto.quantity,
      subtotal: createCartItemDto.quantity * produto.preco,
    });

    return await this.cartItemRepository.save(cartItem);
  }

  async findAll() {
    return await this.cartItemRepository.find();
  }

  async findOne(id: number) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id },
    });
    if (!cartItem) {
      throw new NotFoundException(`Item com id: ${id} não encontrado`);
    }

    return cartItem;
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    await this.findOne(id);
    await this.cartItemRepository.update(id, updateCartItemDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.cartItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item com id: ${id} não encontrado`);
    }
  }
}
