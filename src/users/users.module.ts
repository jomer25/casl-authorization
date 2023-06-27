import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CaslModule } from 'src/casl/casl.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CaslGuard } from './guards/casl.guard';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

@Module({
  imports: [CaslModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {provide: APP_GUARD, useClass: CaslGuard},
    {provide: APP_FILTER, useClass: AllExceptionsFilter},
  ],
})
export class UsersModule {}
