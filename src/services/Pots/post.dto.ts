import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class PostDto implements Prisma.PostCreateInput {
  author: Prisma.UserCreateNestedOneWithoutPostsInput;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @MinLength(1)
  title: string;

  @IsString()
  @MaxLength(500)
  @MinLength(1)
  content: string;

  published: boolean;
}
