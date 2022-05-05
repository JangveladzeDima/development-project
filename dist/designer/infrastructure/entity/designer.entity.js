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
exports.DesignerEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../user/infrastructure/entity/user.entity");
let DesignerEntity = class DesignerEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DesignerEntity.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar"
    }),
    __metadata("design:type", String)
], DesignerEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar"
    }),
    __metadata("design:type", String)
], DesignerEntity.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar"
    }),
    __metadata("design:type", String)
], DesignerEntity.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar"
    }),
    __metadata("design:type", String)
], DesignerEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: ''
    }),
    __metadata("design:type", String)
], DesignerEntity.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "date"
    }),
    __metadata("design:type", Date)
], DesignerEntity.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        default: ''
    }),
    __metadata("design:type", String)
], DesignerEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        default: 0
    }),
    __metadata("design:type", Number)
], DesignerEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: true
    }),
    __metadata("design:type", Boolean)
], DesignerEntity.prototype, "isFree", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        default: 0
    }),
    __metadata("design:type", Number)
], DesignerEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        default: -1
    }),
    __metadata("design:type", Number)
], DesignerEntity.prototype, "avatarID", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, user => user.ID),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], DesignerEntity.prototype, "user", void 0);
DesignerEntity = __decorate([
    (0, typeorm_1.Entity)("designer")
], DesignerEntity);
exports.DesignerEntity = DesignerEntity;
//# sourceMappingURL=designer.entity.js.map