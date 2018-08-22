import { Config, IEnvironmentConfig } from './config/config';
import { EnvironmentService } from './environment.variables';

const envService = new EnvironmentService('.env');
const env = envService.get('NODE_ENV') || 'development';

export const SERVER_CONFIG: IEnvironmentConfig = Config[env];

export const DB_CONNECTION_TOKEN: string = 'DbConnectionToken';
export const SERVER_CONFIG_TOKEN: string = 'ServerConfigToken';
export const FACEBOOK_CONFIG_TOKEN: string = 'FacebookConfigToken';
export const TWITTER_CONFIG_TOKEN: string = 'TwitterConfigToken';
export const GOOGLE_CONFIG_TOKEN: string = 'GoogleConfigToken';

//  Database Models
export const USER_MODEL_TOKEN: string = 'User';
export const ARTICLE_MODEL: string = 'Article';

export const MESSAGES = {
  UNAUTHORIZED_EMAIL_OR_USERNAME_IN_USE: 'Email or username already exists',
  UNAUTHORIZED_INVALID_PASSWORD: 'Invalid password',
  UNAUTHORIZED_INVALID_EMAIL: 'The email does not exist',
  UNAUTHORIZED_UNRECOGNIZED_BEARER: 'Unrecognized bearer of the token'
};
