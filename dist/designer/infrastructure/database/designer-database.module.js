"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const designer_entity_1 = require("../entity/designer.entity");
const designer_repository_1 = require("./repository/designer.repository");
let DesignerDatabaseModule = class DesignerDatabaseModule {
};
DesignerDatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([designer_entity_1.DesignerEntity])],
        providers: [designer_repository_1.DesignerRepository],
        exports: [designer_repository_1.DesignerRepository]
    })
], DesignerDatabaseModule);
exports.DesignerDatabaseModule = DesignerDatabaseModule;
//# sourceMappingURL=designer-database.module.js.map