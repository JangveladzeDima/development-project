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
var DesignerController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerController = void 0;
const common_1 = require("@nestjs/common");
const create_designer_dto_1 = require("../dto/create-designer.dto");
let DesignerController = DesignerController_1 = class DesignerController {
    constructor() {
        this.logger = new common_1.Logger(DesignerController_1.name);
    }
    async createDesigner(user) {
        console.log('priveeeeeeeeW');
    }
    async updateDesignerProfile(data, username) {
    }
    async getDesignerById(id) {
    }
    async getDesigners(pageNumber, limit) {
    }
};
__decorate([
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_designer_dto_1.CreateDesignerDTO]),
    __metadata("design:returntype", Promise)
], DesignerController.prototype, "createDesigner", null);
__decorate([
    (0, common_1.Patch)("/update-profile"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DesignerController.prototype, "updateDesignerProfile", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DesignerController.prototype, "getDesignerById", null);
__decorate([
    (0, common_1.Get)("/list"),
    __param(0, (0, common_1.Query)("pageNumber")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DesignerController.prototype, "getDesigners", null);
DesignerController = DesignerController_1 = __decorate([
    (0, common_1.Controller)("designer"),
    __metadata("design:paramtypes", [])
], DesignerController);
exports.DesignerController = DesignerController;
//# sourceMappingURL=designer.controller.js.map