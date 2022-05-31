import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk'
import { IS3Service } from "../port/s3-service.interface";

@Injectable()
export class S3Service implements IS3Service {
    Bucket = 'company-logos-storage'
    s3 = new AWS.S3({
        accessKeyId: 'AKIARR3VR4PPWGNHPLVP',
        secretAccessKey: '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',
        region: 'eu-central-1'
    })

    async uploadFile(fileParams: { file: Express.Multer.File, filename: string }): Promise<string> {
        const file = await this.getFile(fileParams.filename + '.' + fileParams.file.mimetype.split('/')[1])
        if (file !== null) {
            await this.deleteFile(fileParams.file)
        }
        const uploadedFile = await this.s3.upload({
            Body: Buffer.from(fileParams.file.buffer['data']),
            Bucket: this.Bucket,
            Key: fileParams.filename + '.' + fileParams.file.mimetype.split('/')[1]
        }).promise()
        return uploadedFile.Location
    }

    async getFile(filename) {
        try {
            return this.s3.headObject({
                Bucket: this.Bucket,
                Key: filename
            })
        } catch (err) {
            return null
        }
    }

    async deleteFile(file: Express.Multer.File): Promise<any> {
        return this.s3.deleteObject({
            Bucket: this.Bucket,
            Key: file.filename + '.' + file.mimetype.split('/')[1]
        })
    }
}