import { Prisma } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(128)
  email: string;

  @MaxLength(500)
  @MinLength(20)
  posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;

  @IsString()
  password: string;
}
