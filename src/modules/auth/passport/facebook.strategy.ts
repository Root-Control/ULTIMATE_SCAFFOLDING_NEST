import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { use } from 'passport';

import { FACEBOOK_CONFIG_TOKEN, USER_MODEL_TOKEN } from '../../../server.constants';
import { IFacebookConfig } from '../interfaces/facebook-config.interface';
import { IUser } from '../../users/interfaces/user.interface';

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
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        let email: string = profile.emails.shift().value;

        //  Conditional if facebook doesn't return email
        if (!email || email === '') email = `${profile.id}@${profile.provider}.com`;

        const existingUser: IUser = await this.userModel.findOne({ email: email });

        if (existingUser) {
          return done(null, existingUser);
        }
  
        var providerUserProfile = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          email: email,
          username: profile.username || `${profile.id}`,
          profileImageURL: (profile.id) ? '//graph.facebook.com/' + profile.id + '/picture?type=large' : undefined,
          provider: 'facebook',
          providerIdentifierField: 'id',
          providerData: providerData
        };

        const user = new this.userModel(providerUserProfile);
        
        done(null, await user.save());
      } catch (err) {
        done(err, null);
      }

      function generateUsername(profile) {
        var username = '';

        if (profile.emails) {
          username = profile.emails[0].value.split('@')[0];
        } else if (profile.name) {
          username = profile.name.givenName[0] + profile.name.familyName;
        }

        return username.toLowerCase() || undefined;
      }
    }));
  }
}