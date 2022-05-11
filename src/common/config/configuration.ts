import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {WebIdentityCredentials} from "aws-sdk";
import ClientConfiguration = WebIdentityCredentials.ClientConfiguration;

const databaseConfiguration = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(<string>process.env.POSTGERS_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    autoLoadEntities: true,
    synchronize: true
})
const awsConfiguration = (): ClientConfiguration => ({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
})
const S3Configuration = (): {
    Bucket: string
} => ({
    Bucket: process.env.COMPANY_LOGOS_BUCKET_NAME
})
export default () => ({
    db: databaseConfiguration(),
    aws: awsConfiguration(),
    s3: S3Configuration()
})