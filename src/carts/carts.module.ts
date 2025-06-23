import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { CartItemsModule } from 'src/cart-items/cart-items.module';
import { CartItemsService } from 'src/cart-items/cart-items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Cliente, Produto, Loja, CartItem]),
    CartItemsModule,
  ],
  controllers: [CartsController],
  providers: [CartsService, CartItemsService],
})
export class CartsModule {}
