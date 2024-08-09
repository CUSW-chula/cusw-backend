import { UsersRepository } from '@/core/repositories/users.repository';
import { UsersCacheMemoryRepository } from '@/infra/data/cache-memory/users-cache-memory.repository';
import { CreateUserUseCase } from '../create-user';
import { UpdateUsersUseCase } from './update-users.use-case';
import { UpdateUserDto } from '@/shared/dtos/users/update-user.dto';

describe('UpdateUsersUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let updateUserUseCase: UpdateUsersUseCase;
  let userRepository: UsersRepository;

  const name = 'John Doe';
  const email = 'johndoe@example.com';
  const password = '123456';

  const updatedName = 'Jane Doe';
  const updatedEmail = 'janedoe@example.com';

  beforeEach(async () => {
    userRepository = new UsersCacheMemoryRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
    updateUserUseCase = new UpdateUsersUseCase(userRepository);

    await createUserUseCase.execute({ name, email, password });
  });

  it('should be defined', () => {
    expect(updateUserUseCase).toBeDefined();
  });

  it('should update a user', async () => {
    const user = await userRepository.findOne({ email });
    const updateUserDto: UpdateUserDto = {
      id: user.id,
      name: updatedName,
      email: updatedEmail,
      password,
    };

    const updatedUser = await updateUserUseCase.execute(updateUserDto);
    expect(updatedUser).toEqual({
      id: user.id,
      name: updatedName,
      email: updatedEmail,
    });
  });
});
