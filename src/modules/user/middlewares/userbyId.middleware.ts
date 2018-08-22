import { MiddlewareFunction, BadRequestException, NestMiddleware, UnauthorizedException, Injectable, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types } from 'mongoose';
import { IUser } from '../../user/interfaces/user.interface';
import { MESSAGES, USER_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
export class UserIdMiddleware implements NestMiddleware {
  constructor(@Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>) {}
  resolve(...args: any[]): MiddlewareFunction {
    return async (req, res, next) => {
      console.log('req');
      console.log('Fatima');
      console.log(req.params);
      if(!Types.ObjectId.isValid(req.params.id)) return next(new UnauthorizedException('User is invalid'));
      const user = await this.userModel.findById(req.params.id);
      if (user) {
        req.model = user;
        next();
      }
      else return next(new UnauthorizedException('No user with that identifier has been found'));
    };
  }
}
