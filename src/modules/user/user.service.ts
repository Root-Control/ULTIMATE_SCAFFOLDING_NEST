import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { USER_MODEL_TOKEN, SERVER_CONFIG } from '../../server.constants';
import { IUser } from './interfaces/user.interface';

import { parseImageURL } from '../../common/helpers/converters';
@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>) {}

  async me(userModel: IUser) {
  	let user = <any>{};
  	const method = userModel.method;
  	user.displayName = userModel[method].displayName;
  	user.email = userModel[method].email || '';
  	user.method = method;
  	user.gender = userModel.gender;
  	user.avatar = userModel.avatar;
  	user.roles = userModel.roles;
  	return user;
  }
  
  async getUsers(query?): Promise<IUser[]> {
    return await this.userModel.find(query).select('-local.salt  -local.hashedPassword');
  }

  async updateProfileImage(user, file): Promise<IUser> {
    user.avatar = file.location || `/${parseImageURL(file.path)}`;
    return await user.save();
  }

  async deleteUser(user) {
    return await user.remove();
  }
}