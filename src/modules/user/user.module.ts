import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

import { UserIdMiddleware } from './middlewares/userbyId.middleware';
//  Middlewares
import { bodyValidatorMiddleware } from '../auth/middlewares/body-validator.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService
  ],
  exports: [
    ...userProviders
  ]
})
export class UserModule implements NestModule{
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(bodyValidatorMiddleware)
      .forRoutes('users/signup');

    consumer.apply(UserIdMiddleware)
      .forRoutes('users/:id');
  }
}
