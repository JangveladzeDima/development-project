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
exports.CompanyAdapter = void 0;
const common_1 = require("@nestjs/common");
const company_repository_1 = require("../../infrastructure/database/repository/company.repository");
const user_adapter_1 = require("../../../user/domain/adapter/user.adapter");
const crypto_hash_service_1 = require("../../../auth/service/service/crypto-hash.service");
let CompanyAdapter = class CompanyAdapter {
    constructor(companyRepository, userAdapter, cryptoHashService) {
        this.companyRepository = companyRepository;
        this.userAdapter = userAdapter;
        this.cryptoHashService = cryptoHashService;
    }
    async registration(registrationParams) {
        const companyByName = await this.companyRepository.getCompany({
            filter: {
                name: registrationParams.name
            }
        });
        if (companyByName !== null) {
            throw new common_1.BadRequestException('name already exists');
        }
        const companyByEmail = await this.companyRepository.getCompany({
            filter: {
                email: registrationParams.email
            }
        });
        if (companyByEmail !== null) {
            throw new common_1.BadRequestException('email already exists');
        }
        const { hash, salt } = await this.cryptoHashService.generateHashAndSalt(registrationParams.password);
        const company = await this.companyRepository.create(Object.assign(Object.assign({}, registrationParams), { password: hash, salt }));
        const user = await this.userAdapter.create({
            parentID: company.ID,
            email: company.email,
            role: 'company'
        });
        await this.companyRepository.updateCompany({
            filter: {
                ID: company.ID
            },
            updatedParams: {
                user: user.ID
            }
        });
        return company;
    }
};
CompanyAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(company_repository_1.CompanyRepository)),
    __param(1, (0, common_1.Inject)(user_adapter_1.UserAdapter)),
    __param(2, (0, common_1.Inject)(crypto_hash_service_1.CryptoHashService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CompanyAdapter);
exports.CompanyAdapter = CompanyAdapter;
//# sourceMappingURL=company.adapter.js.map