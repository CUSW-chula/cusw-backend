import { UseCase } from '@/core/base/use-case';
import { PostEntity } from '@/core/domain/entities/post.entity';
import { CreatePostMapper } from '@/core/domain/mappers/posts/create-post';
import { CreatedPostMapper } from '@/core/domain/mappers/posts/created-post';
import { PostsRepository } from '@/core/repositories/posts.repository';
import { CreatedPostDto } from '@/shared/dtos/posts/created-post.dto';
import { UpdatePostDto } from '@/shared/dtos/posts/update-post.dto';

export class UpdatePostUseCase implements UseCase<CreatedPostDto> {
  private createPostMapper: CreatePostMapper;
  private createdPostMapper: CreatedPostMapper;

  constructor(private readonly repository: PostsRepository) {
    this.createPostMapper = new CreatePostMapper();
    this.createdPostMapper = new CreatedPostMapper();
  }

  public async execute(post: UpdatePostDto): Promise<CreatedPostDto> {
    const entity: PostEntity = this.createPostMapper.mapFrom(post);
    const createdPost: PostEntity = await this.repository.update(
      entity.id,
      entity,
    );
    return this.createdPostMapper.mapTo(createdPost);
  }
}
