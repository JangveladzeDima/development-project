export interface IS3Service {
    uploadFile(fileParams: { file: Express.Multer.File, filename: string }): Promise<string>
}