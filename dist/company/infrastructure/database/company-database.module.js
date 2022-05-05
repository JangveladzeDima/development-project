"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const copmany_entity_1 = require("../entity/copmany.entity");
const typeorm_2 = require("typeorm");
const company_repository_1 = require("./repository/company.repository");
let CompanyDatabaseModule = class CompanyDatabaseModule {
};
CompanyDatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([copmany_entity_1.CompanyEntity]), typeorm_2.Repository],
        providers: [company_repository_1.CompanyRepository],
        exports: [company_repository_1.CompanyRepository]
    })
], CompanyDatabaseModule);
exports.CompanyDatabaseModule = CompanyDatabaseModule;
//# sourceMappingURL=company-database.module.js.map