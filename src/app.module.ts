import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { LojaModule } from './loja/loja.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { VendasModule } from './vendas/vendas.module';
import { FormaPagamentoModule } from './forma-pagamento/forma-pagamento.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProdutosModule,
    CategoriasModule,
    UserModule,
    AuthModule,
    ClienteModule,
    LojaModule,
    CartsModule,
    CartItemsModule,
    VendasModule,
    FormaPagamentoModule,
    StatusModule,
  ],
})
export class AppModule {}
