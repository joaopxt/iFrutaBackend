/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id: createProdutoDto.categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException(
        `Categoria com id ${createProdutoDto.categoriaId} não encontrada`,
      );
    }

    const produto = this.produtoRepository.create({
      ...createProdutoDto,
      categoria,
    });

    return this.produtoRepository.save(produto);
  }

  async findAll(categoriaId: number | null): Promise<Produto[]> {
    if (!categoriaId) {
      return this.produtoRepository.find({
        relations: ['categoria'],
      });
    }

    return this.produtoRepository.find({
      where: { categoria: { id: categoriaId } },
      relations: ['categoria'],
    });
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['lojas'],
    });
    if (!produto) {
      throw new NotFoundException(`Produto com id: ${id} não encontrado`);
    }
    return produto;
  }

  async update(
    id: number,
    updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    await this.findOne(id);
    await this.produtoRepository.update(id, updateProdutoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.produtoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Produto com id: ${id} não encontrado`);
    }
  }
}
