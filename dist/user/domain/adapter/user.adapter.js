"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdapter = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../infrastructure/database/repository/user.repository");
const available_roles_1 = require("../../../constants/available-roles");
const crypto_hash_service_1 = require("../../../auth/service/service/crypto-hash.service");
let UserAdapter = class UserAdapter {
    constructor(cryptoHashService, userRepository) {
        this.cryptoHashService = cryptoHashService;
        this.userRepository = userRepository;
    }
    async create(createUserParams) {
        if (!available_roles_1.AvailableRoles.includes(createUserParams.role)) {
            throw new common_1.HttpException('role dont correct', common_1.HttpStatus.BAD_REQUEST);
        }
        const userByID = await this.userRepository.getUser({
            filter: {
                parentID: createUserParams.parentID
            }
        });
        if (userByID !== null && userByID.role === createUserParams.role) {
            throw new common_1.BadRequestException('user already exists');
        }
        const userByEmail = await this.userRepository.getUser({
            filter: {
                email: createUserParams.email
            }
        });
        if (userByEmail !== null && userByEmail.email === createUserParams.email) {
            throw new common_1.BadRequestException('email already exists');
        }
        return this.userRepository.create(createUserParams);
    }
    async getUser(filter) {
        const user = await this.userRepository.getUser({
            filter
        });
        if (user === null) {
            throw new common_1.BadRequestException('user dont exists');
        }
        return user;
    }
};
UserAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(crypto_hash_service_1.CryptoHashService)),
    __param(1, (0, common_1.Inject)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [Object, Object])
], UserAdapter);
exports.UserAdapter = UserAdapter;
//# sourceMappingURL=user.adapter.js.map