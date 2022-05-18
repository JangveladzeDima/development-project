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
const create_user_dto_1 = require("../dto/user/create-user.dto");
const role_decorator_1 = require("../auth/decorator/role.decorator");
const login_user_dto_1 = require("../dto/user/login-user.dto");
const user_service_1 = require("../service/user.service");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async create(createUserParams) {
        try {
            const user = await this.userService.create(createUserParams);
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
    async getUser(ID, email, parentID, role) {
        try {
            const filter = {
                ID,
                email,
                parentID,
                role
            };
            const user = await this.userService.getUser(filter);
            return {
                user,
                message: 'ok'
            };
        }
        catch (err) {
            this.logger.error(err);
            throw err;
        }
    }
    async userLogin(loginParams) {
        try {
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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('ID')),
    __param(1, (0, common_1.Query)('email')),
    __param(2, (0, common_1.Query)('parentID')),
    __param(3, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userLogin", null);
UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('/user'),
    __param(0, (0, common_1.Inject)(user_service_1.UserService)),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map