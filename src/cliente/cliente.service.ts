import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loja } from 'src/loja/entities/loja.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Loja)
    private lojaRepository: Repository<Loja>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const user = await this.userRepository.findOne({
      where: { id: createClienteDto.userId },
    });

    if (!user)
      throw new NotFoundException(
        `Usuário #${createClienteDto.userId} não encontrado`,
      );

    const cliente = this.clienteRepository.create({
      ...createClienteDto,
      user,
    });

    return this.clienteRepository.save(cliente);
  }

  async findAll() {
    return await this.clienteRepository.find({
      relations: ['favoritos', 'user'],
    });
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['favoritos', 'user'],
    });

    if (!cliente) throw new NotFoundException(`Cliente #${id} não encontrado`);

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    await this.findOne(id);
    await this.clienteRepository.update(id, updateClienteDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.clienteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente com id: ${id} não encontrado`);
    }
  }

  async addFavorito(lojaId: number, clienteId: number) {
    const loja = await this.lojaRepository.findOne({
      where: { id: lojaId },
    });

    if (!loja)
      throw new NotFoundException(`Loja com id: ${lojaId} não encontrado`);

    const cliente = await this.findOne(clienteId);

    if (cliente.favoritos.some((p) => p.id === lojaId)) {
      throw new Error(`Produto com id: ${lojaId} já favoritado`);
    }

    cliente.favoritos = [...(cliente.favoritos || []), loja];
    await this.clienteRepository.save(cliente);

    return await this.findOne(clienteId);
  }
}
