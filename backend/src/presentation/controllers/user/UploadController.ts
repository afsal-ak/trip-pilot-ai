import { NextFunction,Request,Response} from 'express';
import { HttpStatus } from '../../../constants/HttpStatus/HttpStatus';
import { IUploadUseCase } from '../../../application/useCaseInterfaces/IUploadUseCase';


export class UploadController {
    constructor(private _uploadUseCase: IUploadUseCase) { }

    uploadDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const file = req.file;

            if (!file) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false, message: 'File is required'
                });

                return;
            }

            const extractedText = await this._uploadUseCase.uploadAndExtract(file);
            console.log(file.mimetype, 'mime');
            console.log(extractedText, 'extractedText');
            res.status(HttpStatus.OK)
                .json({
                    success: true,
                    message: 'Document extracted successfully',
                    extractedText,
                });
        } catch (error) {
            next(error);
        }
    };
}