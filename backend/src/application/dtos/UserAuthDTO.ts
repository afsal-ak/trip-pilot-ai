import { IUser } from "../../domain/entities/IUser";

export interface RegisterUserDTO {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}


export interface LoginResponseDTO {
  _id: string;
  fullName: string;
  email: string;
 
}

export const mapToLoginResponseDTO = (user: IUser): LoginResponseDTO => ({
  _id: user._id!.toString(),
  fullName: user.fullName,
  email: user.email,
});
