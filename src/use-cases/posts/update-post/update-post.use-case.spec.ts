import { CreatePostUseCase } from '../create-post';
import { UpdatePostUseCase } from './update-post.use-case';
import { PostsRepository } from '@/core/repositories/posts.repository';
import { PostsCacheMemoryRepository } from '@/infra/data/cache-memory/posts-cache-memory.repository';
import { UpdatePostDto } from '@/shared/dtos/posts/update-post.dto';

describe('UpdatePostsUseCase', () => {
  let createPostUseCase: CreatePostUseCase;
  let updatePostUseCase: UpdatePostUseCase;
  let postRepository: PostsRepository;

  const title = 'Head 1';
  const content = 'lorem ipsum';
  const userId = 1;

  const updatedTitle = 'Head 2';
  const updatedContent = 'lorem ipsum eoeoeoe';
  const updateUserId = 2;

  beforeEach(async () => {
    postRepository = new PostsCacheMemoryRepository();
    createPostUseCase = new CreatePostUseCase(postRepository);
    updatePostUseCase = new UpdatePostUseCase(postRepository);

    await createPostUseCase.execute({ title, content, userId });
  });

  it('should be defined', () => {
    expect(updatePostUseCase).toBeDefined();
  });

  it('should update a user', async () => {
    const post = await postRepository.findOne({ title });
    const updatePostDto: UpdatePostDto = {
      id: post.id,
      content: updatedContent,
      title: updatedTitle,
      userId: updateUserId,
    };

    const updatePost = await updatePostUseCase.execute(updatePostDto);
    expect(updatePost).toEqual({
      id: post.id,
      title: updatedTitle,
      content: updatedContent,
      userId: updateUserId,
    });
  });
});
