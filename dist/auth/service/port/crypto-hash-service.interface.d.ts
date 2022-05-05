export interface ICryptoHashService {
    generateHashAndSalt(text: string): Promise<{
        hash: string;
        salt: string;
    }>;
    generateHashBySalt(text: string, salt: string): Promise<string>;
}
