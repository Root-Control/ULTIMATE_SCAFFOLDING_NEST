import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook', 'twitter'],
    required: true
  },
  roles: [String],
  gender: String,
  avatar: {
    type: String,
    default: 'http://www.google.com.pe'
  },
  local: {
    firstName: String,
    lastName: String,
    displayName: String,
    active: {
      type: Boolean,
      default: false
    },
    email: { type: String, lowercase: true, unique: true, sparse: true },
    salt: String,
    hashedPassword: String
  },
  google: {
    id: String,
    email: String,
    displayName: String
  },
  facebook: {
    id: String,
    email: String,
    displayName: String
  },
  twitter: {
    id: String,
    username: String,
    displayName: String
  },
  resetPasswordToken: String,
  resetPasswordExpires: String
});
