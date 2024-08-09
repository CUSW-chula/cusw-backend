import { PostsRepository } from '@/core/repositories/posts.repository';
import { PrismaPostsRepository } from '@/infra/data/prisma/prisma-posts.repository';
import { PrismaService } from '@/infra/data/prisma/prisma.service';
import { CreatePostUseCase } from '@/use-cases/posts/create-post';
import { FindAllPostsUseCase } from '@/use-cases/posts/find-all-posts';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { UpdatePostUseCase } from '@/use-cases/posts/update-post/update-post.use-case';

@Module({
  controllers: [PostsController],
  providers: [
    PrismaService,
    {
      provide: PostsRepository,
      useFactory: (prisma: PrismaService) => new PrismaPostsRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: CreatePostUseCase,
      useFactory: (repository: PostsRepository) =>
        new CreatePostUseCase(repository),
      inject: [PostsRepository],
    },
    {
      provide: FindAllPostsUseCase,
      useFactory: (repository: PostsRepository) =>
        new FindAllPostsUseCase(repository),
      inject: [PostsRepository],
    },
    {
      provide: UpdatePostUseCase,
      useFactory: (repository: PostsRepository) =>
        new UpdatePostUseCase(repository),
      inject: [PostsRepository],
    },
  ],
})
export class PostsModule {}
