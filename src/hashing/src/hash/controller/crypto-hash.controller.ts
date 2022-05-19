import {Controller, Inject, Logger} from "@nestjs/common";
import {CryptoHashService} from "../service/crypto-hash.service";
import {Payload, MessagePattern} from '@nestjs/microservices'
import {ICryptoHashService} from "../port/crypto-hash-service.interface";

@Controller('hash')
export class CryptoHashController {
    logger = new Logger(CryptoHashController.name)

    constructor(
        @Inject(CryptoHashService) private readonly cryptoHashService: ICryptoHashService) {
    }

    @MessagePattern('get-hash-and-salt-by-text')
    async getHashAndSaltByText(@Payload() text: string) {
        try {
            console.log("aqvar");
            return this.cryptoHashService.generateHashAndSalt(text)
        } catch (err) {
            this.logger.error(err)
            return err
        }
    }

    async getHashBySalt(@Payload() text: string, salt: string) {
        try {
            return this.cryptoHashService.generateHashBySalt(text, salt)
        } catch (err) {
            this.logger.error(err)
            return err
        }
    }
}