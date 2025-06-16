import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loja } from './entities/loja.entity';
import { Not, Repository } from 'typeorm';
import { Produto } from 'src/produtos/entities/produto.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(Loja)
    private lojaRepository: Repository<Loja>,
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createLojaDto: CreateLojaDto) {
    const user = await this.userRepository.findOne({
      where: { id: createLojaDto.userId },
    });

    if (!user)
      throw new NotFoundException(
        `Usuário #${createLojaDto.userId} não encontrado`,
      );

    const loja = this.lojaRepository.create({
      ...createLojaDto,
      user,
    });

    return this.lojaRepository.save(loja);
  }

  async findAll() {
    return this.lojaRepository.find();
  }

  async findOne(id: number) {
    const loja = await this.lojaRepository.findOne({
      where: { id },
      relations: ['produtos'],
    });

    if (!loja) throw new NotFoundException(`Loja #${id} não encontrada`);

    return loja;
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {
    await this.findOne(id);
    await this.lojaRepository.update(id, updateLojaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.lojaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Loja com id: ${id} não encontrada`);
    }
  }

  async addProduto(lojaId: number, produtoId: number) {
    const produto = await this.produtoRepository.findOne({
      where: { id: produtoId },
    });

    if (!produto)
      throw new NotFoundException(
        `Produto com id: ${produtoId} não encontrado`,
      );

    const loja = await this.findOne(lojaId);

    if (produto.loja && produto.loja.id === lojaId) {
      throw new Error(`Produto com id: ${produtoId} já está associado à loja`);
    }

    produto.loja = loja;
    await this.produtoRepository.save(produto);

    return await this.findOne(lojaId);
  }
}
