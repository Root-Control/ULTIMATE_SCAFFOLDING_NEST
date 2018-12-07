import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { USER_MODEL_TOKEN, SERVER_CONFIG } from '../../server.constants';
import { IUser } from './interfaces/user.interface';
import { isEmptyObject } from '../../common/helpers/utils';

import { parseImageURL } from '../../common/helpers/converters';
@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>) {}

  async me(userModel: IUser) {
  	return userModel;
  }
  
  async getUsers(query?): Promise<IUser[]> {
    return await this.userModel.find(query).select('-local.salt  -local.hashedPassword');
  }

  async updateProfileImage(user, file): Promise<IUser> {
    console.log('called here');
    user.avatar = file.location || `/${parseImageURL(file.path)}`;
    return await user.save();
  }

  async deleteUser(user) {
    return await user.remove();
  }

  async updateUser(user, body) {
    const google = user.google.id;
    const local = user.local.email;
    const twitter = user.twitter.id;
    const facebook = user.facebook.id;

    if(google) {
      //  Do stuff updating google
    } else if (twitter) {
      //  Do stuff updating twitter
    } else if (facebook) {
      //  Do stuff updating facebook
    } else {
      //  Do stuff updating local
    }
    return user;
  }
}