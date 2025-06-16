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
import { Loja } from 'src/loja/entities/loja.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
    @InjectRepository(Loja)
    private lojaRepository: Repository<Loja>,
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

    const loja = await this.lojaRepository.findOne({
      where: { id: createProdutoDto.lojaId },
      relations: ['produtos'],
    });

    if (!loja) {
      throw new NotFoundException(
        `Loja com id ${createProdutoDto.lojaId} não encontrada`,
      );
    }

    const produtoExistente = await this.produtoRepository.findOne({
      where: {
        nome: createProdutoDto.nome, // Normaliza o nome
        loja: { id: createProdutoDto.lojaId }, // Verifica se o produto pertence à loja
      },
    });

    if (produtoExistente) {
      throw new Error(`Produto já registrado`);
    }

    const produto = this.produtoRepository.create({
      ...createProdutoDto,
      categoria,
      loja,
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
