import { RegisterUserDTO } from '../../../application/dtos/UserAuthDTO';
import { UserDetailsDTO } from '../../../application/dtos/UserDTO';
 
export interface IUserAuthUseCases {
    register(userData: RegisterUserDTO): Promise<UserDetailsDTO>  
  
    login(
    email: string,
    password: string
  ): Promise<{
    user: UserDetailsDTO;
    accessToken: string;
    refreshToken: string;
  }>;
  }
