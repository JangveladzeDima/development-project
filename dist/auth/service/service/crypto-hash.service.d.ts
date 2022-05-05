import { ICryptoHashService } from "../port/crypto-hash-service.interface";
export declare class CryptoHashService implements ICryptoHashService {
    private readonly iterations;
    private readonly keylen;
    private readonly digest;
    generateHashAndSalt(text: any): Promise<{
        hash: string;
        salt: string;
    }>;
    generateHashBySalt(text: any, salt: any): Promise<string>;
    private generateRandomString;
}
