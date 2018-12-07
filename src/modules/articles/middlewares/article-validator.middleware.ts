import { MiddlewareFunction, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { validate } from 'joi';
import { articleSchema } from '../../articles/joi/article.joi';

export const articleValidatorMiddleware: MiddlewareFunction =
  async (req: Request, res: Response, next: Function) => {
  	console.log('HI, IM ARTICLE MIDDLEWARE');
    const result = validate(req.body, articleSchema);

    if (result.error) {
      const errorMessage = result.error.details.shift().message;
      const message: string = errorMessage.replace(/["]/g, '');

      return next(new BadRequestException(`Validation failed: ${message}`));
    }
    next();
  };
