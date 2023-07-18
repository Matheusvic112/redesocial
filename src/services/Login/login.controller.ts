import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUsuarioDto } from '../usuario.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() loginDto: CreateUsuarioDto) {
    const token = await this.loginService.login(loginDto);
    return token;
  }
}
