import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ArticlesController } from './articles.controller';
import { articleProviders } from './articles.providers';
import { ArticlesService } from './articles.service';

import { ArticlesGateway } from './articles.gateway';

import { ArticleIdMiddleware } from './middlewares/articleById.middleware';
//  Middlewares
import { articleValidatorMiddleware } from '../articles/middlewares/article-validator.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticlesController],
  providers: [
    ArticlesGateway,
    ...articleProviders,
    ArticlesService
  ],
  exports: [
    ...articleProviders
  ]
})
export class ArticlesModule implements NestModule{
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(articleValidatorMiddleware)
      .forRoutes({ path: 'articles', method: RequestMethod.POST });

    consumer.apply(ArticleIdMiddleware)
      .forRoutes({ path: 'articles/:articleId', method: RequestMethod.ALL });
      //  users id calling middleware for findById users before run another methods like "delete/update/read"
  }
}
