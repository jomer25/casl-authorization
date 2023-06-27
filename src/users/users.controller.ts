import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CaslAbility, CreateUserAbility, DeleteUserAbility, ReadUserAbility, UpdateUserAbility } from './decorators/casl-ability.decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CaslAbility(new CreateUserAbility())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @CaslAbility(new ReadUserAbility())
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @CaslAbility(new ReadUserAbility())
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  @CaslAbility(new UpdateUserAbility())
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @CaslAbility(new DeleteUserAbility())
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
