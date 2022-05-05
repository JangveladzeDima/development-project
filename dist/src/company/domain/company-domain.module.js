"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyDomainModule = void 0;
const common_1 = require("@nestjs/common");
const company_database_module_1 = require("../infrastructure/database/company-database.module");
const company_adapter_1 = require("./adapter/company.adapter");
const user_domain_module_1 = require("../../user/domain/user-domain.module");
const auth_module_1 = require("../../auth/auth.module");
let CompanyDomainModule = class CompanyDomainModule {
};
CompanyDomainModule = __decorate([
    (0, common_1.Module)({
        imports: [
            company_database_module_1.CompanyDatabaseModule,
            user_domain_module_1.UserDomainModule,
            auth_module_1.AuthModule
        ],
        providers: [company_adapter_1.CompanyAdapter],
        exports: [company_adapter_1.CompanyAdapter]
    })
], CompanyDomainModule);
exports.CompanyDomainModule = CompanyDomainModule;
//# sourceMappingURL=company-domain.module.js.map