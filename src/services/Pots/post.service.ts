import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.services';
import { PostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, postData: PostDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const post = await this.prismaService.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        author: { connect: { id: userId } },
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return post;
  }
  async getPost() {
    const post = await this.prismaService.post.findMany({
      select: {
        id: true,
        author: { select: { id: true, email: true, name: true } },
        content: true,
        title: true,
      },
    });
    return post;
  }

  async getPostId(idPost: string) {
    const post = await this.prismaService.post.findUnique({
      where: { id: idPost },
      select: {
        published: true,
        content: true,
        title: true,
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
    return post;
  }
  async deletePost(idPost: string) {
    const postDelete = await this.prismaService.post.findUnique({
      where: { id: idPost },
    });
    return postDelete;
  }
  async updatePost(idPost: string, body: PostDto) {
    const postUpdate = await this.prismaService.post.findUnique({
      where: { id: idPost },
    });
    if (!postUpdate) {
      throw new Error('Post not found');
    }
    const update = await this.prismaService.post.update({
      where: { id: idPost },
      data: { ...body },
    });

    if (!update) {
      throw new Error('Post not found');
    }
    return update;
  }
}
