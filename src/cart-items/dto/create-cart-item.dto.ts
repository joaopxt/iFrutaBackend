import { IsNumber } from 'class-validator';

export class CreateCartItemDto {
  @IsNumber()
  cartId: number;

  @IsNumber()
  produtoId: number;

  @IsNumber()
  quantity: number;
}
