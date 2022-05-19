import {Module} from "@nestjs/common";
import {CryptoHashService} from './hash/service/crypto-hash.service';
import {ConfigModule} from '@nestjs/config'
import {CryptoHashController} from "./hash/controller/crypto-hash.controller";


@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true
    })],
    providers: [CryptoHashService],
    controllers: [CryptoHashController]
})
export class CryptoHashModule {
}