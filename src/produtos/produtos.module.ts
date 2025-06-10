import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { Produto } from './entities/produto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Categoria]), AuthModule],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}