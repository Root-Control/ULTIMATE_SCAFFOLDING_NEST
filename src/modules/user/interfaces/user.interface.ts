import { Document } from 'mongoose';

export interface IUser extends Document {
  method: string;
  roles: string[];
  gender: string;
  avatar: string;
  local: {
    firstName: string;
    lastName: string;
    displayName: string;
    active: {
      type: boolean,
      default: false
    },
    email: string;
    salt: string;
    hashedPassword: string;
    roles: string[];
  };
  google: {
    id: string;
    email: string;
    displayName: string;
  };
  facebook: {
    displayName: string;
    id: string;
    email: string;
  };
  twitter: {
    id: string;
    username: string;
    displayName: string;
  };
  resetPasswordToken: string;
  resetPasswordExpires: string;
}
