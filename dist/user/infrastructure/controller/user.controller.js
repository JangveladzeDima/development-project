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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../dto/create-user.dto");
const user_adapter_1 = require("../../domain/adapter/user.adapter");
const role_decorator_1 = require("../../../auth/decorator/role.decorator");
const role_guard_1 = require("../../../auth/guard/role.guard");
const common_2 = require("@nestjs/common");
const jwt_guard_1 = require("../../../auth/guard/jwt.guard");
const jwt_service_1 = require("../../../auth/service/jwt.service");
let UserController = UserController_1 = class UserController {
    constructor(userAdapter, jwtService) {
        this.userAdapter = userAdapter;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async create(createUserParams) {
        try {
            const user = await this.userAdapter.create(createUserParams);
            return {
                user,
                message: 'ok!'
            };
        }
        catch (err) {
            this.logger.error(err.message);
            throw err;
        }
    }
    async getUser(filter) {
        try {
            const user = await this.userAdapter.getUser(filter);
            return {
                user,
                message: 'ok!'
            };
        }
        catch (err) {
            this.logger.error(err.message);
            throw err;
        }
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    (0, role_decorator_1.Roles)('admin', 'user'),
    (0, common_2.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Body)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('/user'),
    __param(0, (0, common_1.Inject)(user_adapter_1.UserAdapter)),
    __metadata("design:paramtypes", [Object, jwt_service_1.JwtAuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map