import { Module } from "@nestjs/common";
import { S3Service } from "./service/s3-service";
import { S3Controller } from "./controller/s3.controller";

@Module({
    providers: [S3Service],
    exports: [S3Service],
    controllers:[S3Controller]
})
export class AwsS3Module {
}