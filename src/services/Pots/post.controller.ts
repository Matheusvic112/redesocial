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
import { PostDto } from './post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post(':id')
  async createPost(@Param('id') userId: string, @Body() postData: PostDto) {
    const post = await this.postService.create(userId, postData);
    return post;
  }

  @Get()
  @HttpCode(200)
  async listarUsers() {
    const users = this.postService.getPost();
    return users;
  }

  @Get(':id')
  async getIdPoster(@Param('id') postId: string) {
    const post = await this.postService.getPostId(postId);
    return post;
  }

  @Delete(':id')
  @HttpCode(204)
  async deletePost(@Param('id') postId: string) {
    const post = await this.postService.deletePost(postId);
    return post;
  }

  @Patch(':id')
  @HttpCode(200)
  async updatePost(@Param('id') postId: string, @Body() postData: PostDto) {
    const post = await this.postService.updatePost(postId, postData);
    return post;
  }
}
