import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categoria } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}

// import { Module } from '@nestjs/common';
// import { CategoriasService } from './categorias.service';
// import { CategoriasController } from './categorias.controller';

// @Module({
//   controllers: [CategoriasController],
//   providers: [CategoriasService],
// })
// export class CategoriasModule {}
