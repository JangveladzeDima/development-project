import * as crypto from 'crypto'
import {Injectable} from '@nestjs/common';
import {ICryptoHashService} from "../port/crypto-hash-service.interface";

@Injectable()
export class CryptoHashService implements ICryptoHashService {
    private readonly iterations = 10000
    private readonly keylen = 64
    private readonly digest = 'sha512'

    async generateHashAndSalt(text) {
        const randomString = await this.generateRandomString(10)
        const hashString = await crypto.pbkdf2Sync(text, randomString, this.iterations, this.keylen, this.digest)
        return {
            hash: hashString.toString('hex'),
            salt: randomString
        }
    }

    async generateHashBySalt(text, salt) {
        const hashString = await crypto.pbkdf2Sync(text, salt, this.iterations, this.keylen, this.digest)
        return hashString.toString('hex')
    }

    private async generateRandomString(len) {
        const randomString = await crypto.randomBytes(len)
        return randomString.toString('hex')
    }

}
