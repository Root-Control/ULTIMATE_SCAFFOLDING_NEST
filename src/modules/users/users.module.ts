import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { userProviders } from './users.providers';
import { UserService } from './users.service';

import { UserIdMiddleware } from './middlewares/userbyId.middleware';
//  Middlewares
import { bodyValidatorMiddleware } from '../auth/middlewares/body-validator.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UserService
  ],
  exports: [
    ...userProviders
  ]
})
export class UsersModule implements NestModule{
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(bodyValidatorMiddleware)
      .forRoutes('users/signup');

    consumer.apply(UserIdMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.ALL });
      //  users id calling middleware for findById users before run another methods like "delete/update/read"
  }
}
