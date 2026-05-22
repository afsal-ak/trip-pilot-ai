import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { hashPassword, comparePassword } from '../../shared/utils/hash';
import { IUser } from '../../domain/entities/IUser';
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from '../../shared/utils/jwt';
import { AppError } from '../../shared/utils/AppError';
import { IUserAuthUseCases } from '../useCaseInterfaces/IUserAuthUseCases';
import { mapToUserDetailsDTO, UserDetailsDTO } from '../dtos/UserDTO';
import { RegisterUserDTO } from '../dtos/UserAuthDTO';

export class UserAuthUsecases implements IUserAuthUseCases {
  constructor(private _userRepository: IUserRepository) { }


  async register(userData: RegisterUserDTO): Promise<UserDetailsDTO> {

    const {
      fullName,

      email,
      password,
      confirmPassword,
    } = userData;


    const existingEmail = await this._userRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error('Email already taken');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }


    const hashedPassword = await hashPassword(password);


    const newUser: IUser = {
      fullName,
      email,

      password: hashedPassword,
     };

    const user = await this._userRepository.createUser(newUser);


    if (!user || !user._id) {
      throw new Error('User creation failed');
    }

    return mapToUserDetailsDTO(user);
  }

  // ----------------------------
  // Login
  // ----------------------------
  async login(
    email: string,
    password: string
  ): Promise<{ user: UserDetailsDTO; accessToken: string; refreshToken: string }> {
    const user = await this._userRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new Error('Incorrect email or password');
    }

    

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Incorrect email or password');
    }

    const payload = {
      id: user._id,
      email: user.email,
     };

    return {
      user: mapToUserDetailsDTO(user),
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };
  }



}
