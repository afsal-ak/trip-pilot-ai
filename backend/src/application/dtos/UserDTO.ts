import { IUser } from "../../domain/entities/IUser";

export interface UserDetailsDTO {
  _id: string;
  fullName: string;
  email: string;

}

export const mapToUserDetailsDTO = (user: IUser): UserDetailsDTO => ({
  _id: user._id!.toString(),
  fullName: user.fullName,
  email: user.email,

});
