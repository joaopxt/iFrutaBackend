import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('newCart')
  @UseGuards(AuthGuard('jwt'), RolesGuard) // @@ importante
  @Roles(UserRole.USER, UserRole.ADMIN)
  create(@Body() body: { createCartDto: CreateCartDto; produtoId: number }) {
    const { createCartDto, produtoId } = body;
    return this.cartsService.create(createCartDto, produtoId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard) // @@ importante
  @Roles(UserRole.USER, UserRole.ADMIN)
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard) // @@ importante
  @Roles(UserRole.USER, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard) // @@ importante
  @Roles(UserRole.USER, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard) // @@ importante
  @Roles(UserRole.USER, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }

  @Post('/addItem/:cartId/:produtoId/:quantity')
  addItemToCart(
    @Param('cartId') cartId: string,
    @Param('produtoId') produtoId: string,
    @Param('quantity') quantity: string,
  ) {
    return this.cartsService.addItemToCart(+cartId, +produtoId, +quantity);
  }
}
