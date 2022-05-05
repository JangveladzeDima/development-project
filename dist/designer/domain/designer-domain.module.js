"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerDomainModule = void 0;
const common_1 = require("@nestjs/common");
const designer_adapter_1 = require("./adapter/designer.adapter");
const designer_database_module_1 = require("../infrastructure/database/designer-database.module");
const user_domain_module_1 = require("../../user/domain/user-domain.module");
let DesignerDomainModule = class DesignerDomainModule {
};
DesignerDomainModule = __decorate([
    (0, common_1.Module)({
        imports: [designer_database_module_1.DesignerDatabaseModule, user_domain_module_1.UserDomainModule],
        providers: [designer_adapter_1.DesignerAdapter],
        exports: [designer_adapter_1.DesignerAdapter]
    })
], DesignerDomainModule);
exports.DesignerDomainModule = DesignerDomainModule;
//# sourceMappingURL=designer-domain.module.js.map