import pdfParse from 'pdf-parse';
import Tesseract from 'tesseract.js';

import { IUploadUseCase } from '../useCaseInterfaces/IUploadUseCase';
import { AppError } from '../../shared/utils/AppError';
import { HttpStatus } from '../../constants/HttpStatus/HttpStatus';

export class UploadUseCase
  implements IUploadUseCase
{
  async uploadAndExtract(
    file: Express.Multer.File
  ): Promise<string> {
    if (!file) {
      throw new AppError(
        HttpStatus.NO_CONTENT,
        'No file uploaded'
      );
    }

    // PDF extraction
    if (
      file.mimetype ===
      'application/pdf'
    ) {
      const pdfData =
        await pdfParse(
          file.buffer
        );

      return pdfData.text;
    }

    // Image OCR
    if (
      file.mimetype.startsWith(
        'image/'
      )
    ) {
      const {
        data: { text },
      } =
        await Tesseract.recognize(
          file.buffer,
          'eng'
        );

      return text;
    }

    throw new AppError(
      HttpStatus.BAD_REQUEST,
      'Unsupported file type'
    );
  }
}