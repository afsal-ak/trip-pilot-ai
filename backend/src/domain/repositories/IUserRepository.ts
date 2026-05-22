import { IUser } from '../entities/IUser';
 
export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
  createUser(user: Partial<IUser>): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  
}
