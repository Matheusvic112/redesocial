import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Importe o JwtModule
import { PrismaService } from './Database/prisma.services';
import { LoginController } from './services/Login/login.controller';
import { LoginService } from './services/Login/login.service';
import { PostController } from './services/Pots/post.controller';
import { PostService } from './services/Pots/post.service';
import { UsuarioController } from './services/Users/usuario.controller';
import { UserService } from './services/Users/usuario.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '89669',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [UsuarioController, LoginController, PostController],
  providers: [UserService, PrismaService, LoginService, PostService],
})
export class AppModule {}
