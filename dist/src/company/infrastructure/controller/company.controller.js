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
var CompanyController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const company_registration_dto_1 = require("../dto/company-registration.dto");
const company_adapter_1 = require("../../domain/adapter/company.adapter");
let CompanyController = CompanyController_1 = class CompanyController {
    constructor(companyAdapter) {
        this.companyAdapter = companyAdapter;
        this.logger = new common_1.Logger(CompanyController_1.name);
    }
    async companyRegistration(registrationParams) {
        try {
            const company = await this.companyAdapter.registration(registrationParams);
            return {
                company,
                message: 'ok!'
            };
        }
        catch (err) {
            this.logger.error(err.message);
            throw err;
        }
    }
};
__decorate([
    (0, common_1.Post)('/registration'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_registration_dto_1.CompanyRegistrationDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "companyRegistration", null);
CompanyController = CompanyController_1 = __decorate([
    (0, common_1.Controller)('/company'),
    __param(0, (0, common_1.Inject)(company_adapter_1.CompanyAdapter)),
    __metadata("design:paramtypes", [Object])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map