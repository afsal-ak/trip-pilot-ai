import { NextFunction, Request, Response } from 'express';
import { getUserIdFromRequest } from '../../../shared/utils/getUserIdFromRequest';
import { HttpStatus } from '../../../constants/HttpStatus/HttpStatus';
import { IUserAuthUseCases } from '../../../application/useCaseInterfaces/user/IUserAuthUseCases';
import {  RegisterUserDTO } from '../../../application/dtos/UserAuthDTO';
import { UserAuthMessages } from '../../../constants/messages.ts/UserAuthMessages';
export class UserAuthController {
  constructor(private _userAuthUseCases: IUserAuthUseCases) { }


  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const data: RegisterUserDTO = req.body;
      await this._userAuthUseCases.register(data);

      res.status(HttpStatus.CREATED).json({
        success: true,
        message: UserAuthMessages.REGISTER_SUCCESS,
      });
    } catch (error: any) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await this._userAuthUseCases.login(
        email,
        password
      );
      res.cookie('userRefreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
      res.status(HttpStatus.OK).json({
        success: true,
        message: UserAuthMessages.LOGIN_SUCCESS,
        accessToken,
        user
      });
    } catch (error: any) {
      next(error);
    }
  };

  userLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.clearCookie('userRefreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
      });

      res.status(HttpStatus.OK).json({
        message: UserAuthMessages.LOGOUT_SUCCESS,
      });
    } catch (error: any) {
      next(error);
    }
  };


  


}
