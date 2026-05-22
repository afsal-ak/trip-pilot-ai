import { Request } from "express";
import { IUser } from "../../domain/entities/IUser";
 
export interface CustomRequest
  extends Request {
  user?: IUser;
}