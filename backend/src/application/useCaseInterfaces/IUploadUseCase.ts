export interface IUploadUseCase {
  uploadAndExtract(
    file: Express.Multer.File
  ): Promise<string>;
}