import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

import { IUser } from "../../domain/entities/IUser";

export interface IUserDocument
  extends Omit<IUser, "_id">,
    Document {
  _id: mongoose.Types.ObjectId;
}

const UserSchema =
  new Schema<IUserDocument>(
    {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
      },

    },
    {
      timestamps: true,
    }
  );

export const UserModel: Model<IUserDocument> =
  mongoose.model<IUserDocument>(
    "User",
    UserSchema
  );