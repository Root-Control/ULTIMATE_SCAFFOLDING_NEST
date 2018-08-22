import { Document } from 'mongoose';
import { IUser } from '../../user/interfaces/user.interface';

export interface IAccount extends Document {
  user: IUser;
}
