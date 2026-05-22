import {  IUser } from '../../domain/entities/IUser';
import { UserModel } from '../../infrastructure/models/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { AppError } from '../../shared/utils/AppError';
 import { HttpStatus } from '../../constants/HttpStatus/HttpStatus';

export class UserRepository implements IUserRepository {

  

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email: email });
    return user ? user.toObject() : null;
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ username: username });
    return user ? user.toObject() : null;
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    const saved = await newUser.save();
    return saved.toObject();
  }

  
  async findById(id: string): Promise<IUser | null> {
    const user = await UserModel.findById(id);
    return user ? user.toObject() : null;
  }



  async getUserProfile(id: string): Promise<IUser | null> {
    const userProfile = await UserModel.findById(id).select('-password').lean();
    return userProfile || null;
  }



}
