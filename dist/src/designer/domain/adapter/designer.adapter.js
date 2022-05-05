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
const crypto_hash_service_1 = require("../../../auth/service/service/crypto-hash.service");
let DesignerAdapter = class DesignerAdapter {
    constructor(cryptoHashService, designerRepository, userService) {
        this.cryptoHashService = cryptoHashService;
        this.designerRepository = designerRepository;
        this.userService = userService;
    }
    async create(createDesignerParams) {
        const designerByEmail = await this.designerRepository.getDesigner({
            filter: {
                email: createDesignerParams.email
            }
        });
        if (designerByEmail) {
            throw new common_1.BadRequestException('User exists boshyo');
        }
        const { hash, salt } = await this.cryptoHashService.generateHashAndSalt(createDesignerParams.password);
        const designer = await this.designerRepository.create(Object.assign(Object.assign({}, createDesignerParams), { password: hash, salt }));
        const user = await this.userService.create({ parentID: designer.ID, role: 'designer', email: designer.email });
        await this.designerRepository.updateDesignerProfile({
            filter: {
                ID: designer.ID
            },
            updateParams: {
                user: user.ID
            }
        });
        return Object.assign(Object.assign({}, designer), { user: user.ID });
    }
    async getDesigner(params) {
        const designer = await this.designerRepository.getDesigner(params);
        if (designer === null) {
            throw new common_1.BadRequestException('designer dont exists');
        }
        return designer;
    }
};
DesignerAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(crypto_hash_service_1.CryptoHashService)),
    __param(1, (0, common_1.Inject)(designer_repository_1.DesignerRepository)),
    __param(2, (0, common_1.Inject)(user_adapter_1.UserAdapter)),
    __metadata("design:paramtypes", [Object, Object, Object])
], DesignerAdapter);
exports.DesignerAdapter = DesignerAdapter;
//# sourceMappingURL=designer.adapter.js.map