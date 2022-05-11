import {Injectable} from "@nestjs/common";
import config from '../../../common/config/configuration'
import * as AWS from 'aws-sdk'
import {IS3Service} from "../port/s3-service.interface";

@Injectable()
export class S3Service implements IS3Service {
    Bucket = config().s3
    s3 = new AWS.S3({
        ...config().aws
    })

    async uploadFile(fileParams: { file: Express.Multer.File, filename: string }): Promise<string> {
        const uploadedFile=await this.s3.upload({
            Body: fileParams.file.buffer,
            Bucket: this.Bucket.Bucket,
            Key: fileParams.filename
        }).promise()
        return uploadedFile.Location
    }
}