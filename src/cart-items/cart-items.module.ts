import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/carts/entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Loja } from 'src/loja/entities/loja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Produto, Loja])],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
