import { CreateUserDto } from '@/shared/dtos/users/create-user.dto';
import { UpdateUserDto } from '@/shared/dtos/users/update-user.dto';
import { CreateUserUseCase } from '@/use-cases/users/create-user';
import { FindAllUsersUseCase } from '@/use-cases/users/find-all-users';
import { UpdateUsersUseCase } from '@/use-cases/users/update-user';
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findAllUsersUseCase: FindAllUsersUseCase,
    private updateUserUseCase: UpdateUsersUseCase,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.createUserUseCase.execute(data);
  }

  @Get()
  async findAll() {
    return this.findAllUsersUseCase.execute();
  }

  @Patch()
  async update(@Body() data: UpdateUserDto) {
    return this.updateUserUseCase.execute(data);
  }
}
