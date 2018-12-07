// nest
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

// modules
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ArticlesModule } from './modules/articles/articles.module';

import { LoggerMiddleware } from './common/middlewares/logger.middleware';

/* Events module */
import { EventsModule } from './modules/events/events.module';
/* Events module */

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
    EventsModule
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