import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IUser } from '../modules/user/interfaces/user.interface';
import { Model } from 'mongoose';
import { USER_MODEL_TOKEN, SERVER_CONFIG } from '../server.constants';

import { verify } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>,
    private readonly reflector: Reflector
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization || request.headers.Authorization;

    if(!token) return false;

    let parsedToken = verify(token, SERVER_CONFIG.jwtSecret);
    const user =  await this.userModel.findById(parsedToken['_id']).select('-local.salt -local.hashedPassword');
    request.user = user;
    const hasRole = () => user['roles'].some((role: string) => roles.includes(role));
    return user && user['roles'] && hasRole();
  }
}
