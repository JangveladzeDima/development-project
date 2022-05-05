"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainModule = void 0;
const common_1 = require("@nestjs/common");
const user_adapter_1 = require("./adapter/user.adapter");
const database_module_1 = require("../infrastructure/database/database.module");
const auth_module_1 = require("../../auth/auth.module");
let DomainModule = class DomainModule {
};
DomainModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            database_module_1.DatabaseModule
        ],
        providers: [user_adapter_1.UserAdapter],
        exports: [user_adapter_1.UserAdapter]
    })
], DomainModule);
exports.DomainModule = DomainModule;
//# sourceMappingURL=domain.module.js.map