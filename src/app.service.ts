import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityTarget } from 'typeorm';
import { FormaPagamento } from './forma-pagamento/entities/forma-pagamento.entity';
import { Status } from './status/entities/status.entity';
import { Categoria } from './categorias/entities/categoria.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async verificarTabelaVazia(
    repositorio: EntityTarget<FormaPagamento | Status | Categoria>,
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
  }
}
