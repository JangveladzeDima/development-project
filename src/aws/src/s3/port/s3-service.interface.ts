export interface IS3Service {
    uploadFile(fileParams: { file: Express.Multer.File, filename: string }): Promise<string>

    getFile(filename: string): Promise<any>

    deleteFile(file: Express.Multer.File): Promise<any>
}