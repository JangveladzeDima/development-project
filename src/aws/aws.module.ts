import {Module} from "@nestjs/common";
import {AwsS3Module} from "./s3/aws-s3.module";

@Module({
    imports: [AwsS3Module]
})
export class AwsModule {
}