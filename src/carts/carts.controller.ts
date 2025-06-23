import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Produto } from 'src/produtos/entities/produto.entity';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('newCart')
  create(@Body() body: { createCartDto: CreateCartDto; produtoId: number }) {
    const { createCartDto, produtoId } = body;
    return this.cartsService.create(createCartDto, produtoId);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }

  @Post('/addItem/:cartId/:produtoId/:quantity')
  addItemToCart(
    @Param('cartId') cartId: string,
    @Param('produtoId') produtoId: string,
    @Param('quantity') quantity: string,
  ) {
    return this.cartsService.addItemToCart(+cartId, +produtoId, +quantity);
  }
}
