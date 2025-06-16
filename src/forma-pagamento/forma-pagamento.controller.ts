import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormaPagamentoService } from './forma-pagamento.service';
import { CreateFormaPagamentoDto } from './dto/create-forma-pagamento.dto';
import { UpdateFormaPagamentoDto } from './dto/update-forma-pagamento.dto';

@Controller('forma-pagamento')
export class FormaPagamentoController {
  constructor(private readonly formaPagamentoService: FormaPagamentoService) {}

  @Post()
  create(@Body() createFormaPagamentoDto: CreateFormaPagamentoDto) {
    return this.formaPagamentoService.create(createFormaPagamentoDto);
  }

  @Get()
  findAll() {
    return this.formaPagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formaPagamentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormaPagamentoDto: UpdateFormaPagamentoDto) {
    return this.formaPagamentoService.update(+id, updateFormaPagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formaPagamentoService.remove(+id);
  }
}
