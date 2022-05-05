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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerAdapter = void 0;
const common_1 = require("@nestjs/common");
const designer_repository_1 = require("../../infrastructure/database/repository/designer.repository");
const user_adapter_1 = require("../../../user/domain/adapter/user.adapter");
let DesignerAdapter = class DesignerAdapter {
    constructor(designerRepository, userService) {
        this.designerRepository = designerRepository;
        this.userService = userService;
    }
    async create(createDesignerParams) {
        const { ID } = await this.designerRepository.create(createDesignerParams);
        const user = await this.userService.create({ parentID: ID, role: 'designer' });
        await this.designerRepository.updateDesignerProfile({
            filter: {
                ID
            },
            updateParams: {
                user: user.ID
            }
        });
    }
};
DesignerAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(designer_repository_1.DesignerRepository)),
    __param(1, (0, common_1.Inject)(user_adapter_1.UserAdapter)),
    __metadata("design:paramtypes", [Object, Object])
], DesignerAdapter);
exports.DesignerAdapter = DesignerAdapter;
//# sourceMappingURL=designer.adapter.js.map