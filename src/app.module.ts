// nest
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

// modules
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';

import { LoggerMiddleware } from './common/middlewares/logger.middleware';
@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule
  ],
  controllers: []
})

export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}