import { Types } from "mongoose";

 

export interface IUser {
  _id?: Types.ObjectId | string;

  fullName: string;
  email: string;
  password: string;
 
}