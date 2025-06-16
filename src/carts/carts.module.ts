import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Produto, Loja, CartItem])],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
