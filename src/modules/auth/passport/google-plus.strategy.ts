import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { use } from 'passport';
import { v1 } from 'uuid';

import { GOOGLE_CONFIG_TOKEN, USER_MODEL_TOKEN } from '../../../server.constants';
import { IGoogleConfig } from '../interfaces/google-config.interface';
import { IUser } from '../../users/interfaces/user.interface';

const GoogleTokenStrategy = require('passport-google-plus-token');

@Injectable()
export class GoogleStrategy {
  constructor(
    @Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: IGoogleConfig,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
  ) {
    this.init();
  }

  private init(): void {
    use('google', new GoogleTokenStrategy({
      clientID: this.googleConfig.client_id,
      clientSecret: this.googleConfig.client_secret
    }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
      try {
        // Set the provider data and include tokens
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
        const existingUser = await this.userModel.findOne({ email: profile.emails[0].value });

        if (existingUser) {
          return done(null, existingUser);
        }
        // Create the user OAuth profile
        var providerUserProfile = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          profileImageURL: (providerData.picture) ? providerData.picture : providerData.image.url,
          provider: 'google',
          providerIdentifierField: 'id',
          providerData: providerData
        };
        if (!providerUserProfile.username) providerUserProfile.username = v1();
        const user = new this.userModel(providerUserProfile);
        done(null, await user.save());
      } catch (ex) {
        done(ex, null);
      }
    }));
  }
}
