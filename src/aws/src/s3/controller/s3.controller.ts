import { Controller, Inject, Logger } from '@nestjs/common'
import { MessagePattern, Payload } from "@nestjs/microservices";
import { S3Service } from "../service/s3-service";
import { IS3Service } from "../port/s3-service.interface";
import { AddFileDto } from "../dto/add-file.dto";

@Controller('')
export class S3Controller {
    logger = new Logger()

    constructor(
        @Inject(S3Service) private readonly s3Service: IS3Service
    ) {
    }

    @MessagePattern('add-file')
    async addFile(@Payload() fileParams: AddFileDto) {
        try {
            const file = await this.s3Service.uploadFile(fileParams)
            return file
        } catch (err) {
            this.logger.error(err.message)
            return err
        }
    }
}