/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/Database/prisma.services';
import { CreateUsuarioDto } from '../usuario.dto';

@Injectable()
export class UserService {
  get() {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUsuarioDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
      },
    });

    if (!user) {
      throw new NotFoundException('Failed to create user');
    }
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
  async update(id: string, data: CreateUsuarioDto) {
    const { password, name, email } = data;
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      data.password = passwordHash;
    }
    const user = await this.prismaService.user.update({
      where: { id },
      data: { name, email, ...data },
    });
    const { password: userPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAll() {
    const user = await this.prismaService.user.findMany({
      select: { id: true, email: true, name: true, posts: true },
    });
    return user;
  }

  async getUserId(idUser: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: idUser },
      select: { password: false },
    });

    return user;
  }

  async delUser(idUser: string) {
    const user = await this.prismaService.user.delete({
      where: { id: idUser },
    });
    return user;
  }
}
