import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { use } from 'passport';

import { FACEBOOK_CONFIG_TOKEN, USER_MODEL_TOKEN } from '../../../server.constants';
import { IFacebookConfig } from '../interfaces/facebook-config.interface';
import { IUser } from '../../user/interfaces/user.interface';

const FacebookTokenStrategy = require('passport-facebook-token');

@Injectable()
export class FacebookStrategy {
  constructor(
    @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
  ) {
    this.init();
  }

  private init(): void {
    use('facebook', new FacebookTokenStrategy({
      clientID: this.fbConfig.client_id,
      clientSecret: this.fbConfig.client_secret,
      profileFields: ['id', 'name', 'displayName', 'emails', 'photos']
    }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
      try {
        const existingUser: IUser = await this.userModel.findOne({ 'facebook.id': profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }
        //console.log(profile);

        const email: string = profile.emails.shift().value;
        const user: IUser = new this.userModel({
          method: 'facebook',
          roles: ['user'],
          gender: profile.gender,
          avatar: profile.photos[0].value,
          facebook: {
            email,
            id: profile.id,
            displayName: profile.displayName
          }
        });
        console.log(user);

        done(null, await user.save());
      } catch (err) {
        done(err, null);
      }
    }));
  }
}