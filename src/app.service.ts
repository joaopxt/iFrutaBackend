import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityTarget } from 'typeorm';
import { FormaPagamento } from './forma-pagamento/entities/forma-pagamento.entity';
import { Status } from './status/entities/status.entity';
import { Categoria } from './categorias/entities/categoria.entity';
import { User } from './user/entities/user.entity';
import { Loja } from './loja/entities/loja.entity';
import { Cliente } from './cliente/entities/cliente.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async verificarTabelaVazia(
    repositorio: EntityTarget<
      FormaPagamento | Status | Categoria | User | Loja | Cliente
    >,
  ) {
    const repository = this.dataSource.getRepository(repositorio);
    const count = await repository.count();
    return count === 0;
  }

  async seed() {
    const formaPagamentoVazia = this.verificarTabelaVazia(FormaPagamento);

    if (await formaPagamentoVazia) {
      await this.dataSource.transaction(async (db) => {
        const debito = db.create(FormaPagamento, {
          nome: 'Debito',
        });
        const credito = db.create(FormaPagamento, {
          nome: 'Credito',
        });
        const pix = db.create(FormaPagamento, {
          nome: 'Pix',
        });
        await db.save(debito);
        await db.save(credito);
        await db.save(pix);
      });
    } else {
      console.log('Tabela FormaPagamento já populada!');
    }

    const statusVazia = this.verificarTabelaVazia(Status);

    if (await statusVazia) {
      await this.dataSource.transaction(async (db) => {
        const pendente = db.create(Status, {
          nome: 'Pendente',
        });
        const concluido = db.create(Status, {
          nome: 'Concluido',
        });
        const cancelado = db.create(Status, {
          nome: 'Cancelado',
        });
        await db.save(pendente);
        await db.save(concluido);
        await db.save(cancelado);
      });
    } else {
      console.log('Tabela Status já populada!');
    }

    const categoriaVazia = this.verificarTabelaVazia(Categoria);

    if (await categoriaVazia) {
      await this.dataSource.transaction(async (db) => {
        const frutas = db.create(Categoria, {
          nome: 'Frutas',
        });
        const verduras = db.create(Categoria, {
          nome: 'Verduras',
        });
        const legumes = db.create(Categoria, {
          nome: 'Legumes',
        });
        await db.save(frutas);
        await db.save(verduras);
        await db.save(legumes);
      });
    } else {
      console.log('Tabela Categorias já populada!');
    }

    const userVazia = this.verificarTabelaVazia(User);

    if (await userVazia) {
      await this.dataSource.transaction(async (db) => {
        const admin = db.create(User, {
          nomeUsuario: 'joaoAdmin',
          nome: 'João Admin',
          senha: '123456',
          email: 'joaoAdmin@mail.com',
          role: 'ADMIN',
        });
        const user = db.create(User, {
          nomeUsuario: 'joaoUser',
          nome: 'João User',
          senha: '123456',
          email: 'joaoUser@mail.com',
          role: 'USER',
        });
        const manager = db.create(User, {
          nomeUsuario: 'joaoManager',
          nome: 'João Manager',
          senha: '123456',
          email: 'joaoManager@mail.com',
          role: 'MANAGER',
        });
        await db.save(admin);
        await db.save(user);
        await db.save(manager);
      });
    } else {
      console.log('Tabela User já populada!');
    }

    const lojaVazia = this.verificarTabelaVazia(Loja);

    if (await lojaVazia) {
      await this.dataSource.transaction(async (db) => {
        const loja = db.create(Loja, {
          cnpj: 12345678901234,
          nome: 'Verduraria do João',
          horarioFuncionamento: '06:00 - 20:00',
          endereco: 'Avenida Exemplo, 123',
          userId: 3,
        });
        await db.save(loja);
      });
    } else {
      console.log('Tabela Loja já populada!');
    }

    const clienteVazia = this.verificarTabelaVazia(Cliente);

    if (await clienteVazia) {
      await this.dataSource.transaction(async (db) => {
        const cliente = db.create(Cliente, {
          dataNascimento: '1990-01-01',
          celular: 123456789,
          endereco: 'Rua Cliente, 456',
          cpf: 12345678901,
          userId: 2,
        });
        await db.save(cliente);
      });
    } else {
      console.log('Tabela Cliente já populada!');
    }
  }
}
