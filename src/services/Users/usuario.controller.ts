import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../usuario.dto';
import { UserService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async criarUser(@Body() body: CreateUsuarioDto) {
    const user = await this.userService.create(body);
    return user;
  }

  @Get()
  @HttpCode(200)
  async listarUsers() {
    const users = this.userService.getAll();
    return users;
  }
  @Get(':id')
  @HttpCode(200)
  async listarUserId(@Param('id') idUser: string) {
    const user = await this.userService.getUserId(idUser);
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') idUser: string) {
    await this.userService.delUser(idUser);
  }

  @Patch(':id')
  @HttpCode(200)
  async updateUser(
    @Param('id') idUser: string,
    @Body() data: CreateUsuarioDto,
  ) {
    const user = await this.userService.update(idUser, data);
    return user;
  }
}
