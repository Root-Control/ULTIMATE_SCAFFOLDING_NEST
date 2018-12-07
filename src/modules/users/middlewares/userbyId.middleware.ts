import { 
  MiddlewareFunction, 
  BadRequestException,
  UnauthorizedException,
  NestMiddleware, 
  Injectable, 
  Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { Model, Types } from 'mongoose';
import { IUser } from '../../users/interfaces/user.interface';
import { MESSAGES, USER_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
export class UserIdMiddleware implements NestMiddleware {
  constructor(@Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>) {}
  resolve(...args): MiddlewareFunction {
    return async (req, res, next) => {
      const allowedRoutes = ['me', 'upload'];
      const isAllowedRoute = (allowedRoutes.indexOf(req.params.id) > -1);
      if(isAllowedRoute) return next();

      else if(!Types.ObjectId.isValid(req.params.id)) return next(new UnauthorizedException('User is invalid'));
      const user = await this.userModel.findById(req.params.id).select('-local.salt  -local.hashedPassword');
      if (user) {
        req.model = user;
        next();
      }
      else return next(new UnauthorizedException('No user with that identifier has been found'));
    };
  }
}

