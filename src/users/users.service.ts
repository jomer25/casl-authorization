import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { ForbiddenError } from '@casl/ability';
import { Action } from 'src/casl/enums/action.enum';
import { User } from 'src/casl/classes/user.class';

export const currentUser = { id: 1, isAdmin: true, name: "John Doe", age: 40 };

@Injectable()
export class UsersService {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}
  private users: User[] = [currentUser];

  create(createUserDto: CreateUserDto) {
    const ability = this.caslAbilityFactory.createForUser(createUserDto);
    try  {
      ForbiddenError
        .from(ability)
        .throwUnlessCan(Action.Create, createUserDto)
    } catch (error) {
      if(error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }

    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
    }
    return this.users.push(newUser);
  }

  findAll() {
    const ability = this.caslAbilityFactory.createForUser(new User);
    try  {
      ForbiddenError
        .from(ability)
        .throwUnlessCan(Action.Read, User)
    } catch (error) {
      if(error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }

    return this.users;
  }

  findOne(id: number) {
    const ability = this.caslAbilityFactory.createForUser(new User);
    try  {
      ForbiddenError
        .from(ability)
        .throwUnlessCan(Action.Read, User)
    } catch (error) {
      if(error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }

    const user = this.users.find(user => user.id === id);
    if(user) {
      return user;
    }
    throw new NotFoundException();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const ability = this.caslAbilityFactory.createForUser(updateUserDto);
    try  {
      ForbiddenError
        .from(ability)
        .throwUnlessCan(Action.Update, updateUserDto)
    } catch (error) {
      if(error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }

    const updateUser = this.users.find(user => user.id === id);
    if(updateUser) {
      updateUser.isAdmin = updateUserDto.isAdmin || updateUser.isAdmin;
      updateUser.name = updateUserDto.name || updateUser.name;
      updateUser.age = updateUserDto.age || updateUser.age;
      return updateUser;
    }
    throw new NotFoundException();
  }

  remove(id: number) {
    const ability = this.caslAbilityFactory.createForUser(new User);
    try  {
      ForbiddenError
        .from(ability)
        .throwUnlessCan(Action.Delete, User)
    } catch (error) {
      if(error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }

    const userIndex = this.users.findIndex(user => user.id === id);
    if(userIndex !== -1) {
      return this.users.splice(userIndex, 1);
    }
    throw new NotFoundException();
  }
}
