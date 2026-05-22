import { Request } from 'express';
import { AppError } from './AppError';
import { HttpStatus } from '../../constants/HttpStatus/HttpStatus';
import { CustomRequest } from '../../types/express/CustomRequest';
 export const getUserIdFromRequest = (req: CustomRequest): string => {
  const userId = req.user?._id;
  if (!userId) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  return userId.toString();
};
