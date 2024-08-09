import { UseCase } from '@/core/base/use-case';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { CreateUserMapper } from '@/core/domain/mappers/users/create-user';
import { CreatedUserMapper } from '@/core/domain/mappers/users/created-user';
import { UsersRepository } from '@/core/repositories/users.repository';
import { CreatedUserDto } from '@/shared/dtos/users/created-user.dto';
import { UpdateUserDto } from '@/shared/dtos/users/update-user.dto';

export class UpdateUsersUseCase implements UseCase<CreatedUserDto> {
  private createUserMapper: CreateUserMapper;
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UsersRepository) {
    this.createUserMapper = new CreateUserMapper();
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(user: UpdateUserDto): Promise<CreatedUserDto> {
    const entity: UserEntity = this.createUserMapper.mapFrom(user);
    const updatedUser: UserEntity = await this.repository.update(
      user.id,
      entity,
    );
    return this.createdUserMapper.mapTo(updatedUser);
  }
}
