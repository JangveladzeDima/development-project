"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyInfrastructureModule = void 0;
const common_1 = require("@nestjs/common");
const company_database_module_1 = require("./database/company-database.module");
const company_controller_1 = require("./controller/company.controller");
const company_domain_module_1 = require("../domain/company-domain.module");
let CompanyInfrastructureModule = class CompanyInfrastructureModule {
};
CompanyInfrastructureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            company_database_module_1.CompanyDatabaseModule,
            company_domain_module_1.CompanyDomainModule
        ],
        controllers: [company_controller_1.CompanyController]
    })
], CompanyInfrastructureModule);
exports.CompanyInfrastructureModule = CompanyInfrastructureModule;
//# sourceMappingURL=company-infrastructure.module.js.map