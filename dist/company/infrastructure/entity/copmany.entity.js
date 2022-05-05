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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../user/infrastructure/entity/user.entity");
let CompanyEntity = class CompanyEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        unique: true
    }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "identificationCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date'
    }),
    __metadata("design:type", Date)
], CompanyEntity.prototype, "dataOfEstablishment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        unique: true
    }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, user => user.ID),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "password", void 0);
CompanyEntity = __decorate([
    (0, typeorm_1.Entity)('Development-Company')
], CompanyEntity);
exports.CompanyEntity = CompanyEntity;
//# sourceMappingURL=copmany.entity.js.map