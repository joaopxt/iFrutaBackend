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
import { CarrinhoModule } from './carrinho/carrinho.module';
import { CarrinhoModule } from './src/cliente/carrinho/carrinho.module';

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
    CarrinhoModule,
  ],
})
export class AppModule {}
