import { 
  MiddlewareFunction, 
  BadRequestException,
  UnauthorizedException,
  NestMiddleware, 
  Injectable, 
  Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types } from 'mongoose';
import { IArticle } from '../../articles/interfaces/article.interface';
import { MESSAGES, ARTICLE_MODEL } from '../../../server.constants';

@Injectable()
export class ArticleIdMiddleware implements NestMiddleware {
  constructor(@Inject(ARTICLE_MODEL) private readonly articleModel: Model<IArticle>) {}
  resolve(...args): MiddlewareFunction {
    return async (req, res, next) => {

      if(!Types.ObjectId.isValid(req.params.articleId)) return next(new UnauthorizedException('Invalid identifier'));
      const article = await this.articleModel.findById(req.params.articleId);
      if (article) {
        req.article = article;
        next();
      }
      else return next(new UnauthorizedException('No article with that identifier has been found'));
    };
  }
}