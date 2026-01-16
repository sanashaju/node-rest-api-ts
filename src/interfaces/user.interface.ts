import { Document, Types } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
  age?: number | null;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
  role?: string;
  age?: number;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface UserResponse {
  _id: string;
  username: string;
  email: string;
  role: string;
  age?: number | null;
  token?: string;
}
