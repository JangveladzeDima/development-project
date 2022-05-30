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
        const uploadedFile = await this.s3.upload({
            Body: Buffer.from(fileParams.file.buffer['data']),
            Bucket: this.Bucket,
            Key: fileParams.filename+'.'+fileParams.file.mimetype.split('/')[1]
        }).promise()
        return uploadedFile.Location
    }
}