"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoHashService = void 0;
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
let CryptoHashService = class CryptoHashService {
    constructor() {
        this.iterations = 10000;
        this.keylen = 64;
        this.digest = 'sha512';
    }
    async generateHashAndSalt(text) {
        const randomString = await this.generateRandomString(10);
        const hashString = await crypto.pbkdf2Sync(text, randomString, this.iterations, this.keylen, this.digest);
        return {
            hash: hashString.toString('hex'),
            salt: randomString
        };
    }
    async generateHashBySalt(text, salt) {
        const hashString = await crypto.pbkdf2Sync(text, salt, this.iterations, this.keylen, this.digest);
        return hashString.toString('hex');
    }
    async generateRandomString(len) {
        const randomString = await crypto.randomBytes(len);
        return randomString.toString('hex');
    }
};
CryptoHashService = __decorate([
    (0, common_1.Injectable)()
], CryptoHashService);
exports.CryptoHashService = CryptoHashService;
//# sourceMappingURL=crypto-hash.service.js.map