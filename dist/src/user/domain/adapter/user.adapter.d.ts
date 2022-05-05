import { IUserAdapter } from "../port/user-adapter.interface";
import { CreateUserDto } from "../../infrastructure/dto/create-user.dto";
import { IUserRepository } from "../../infrastructure/database/port/user-repository.interface";
import { IUser } from "../../infrastructure/entity/user.interface";
import { ICryptoHashService } from "../../../auth/service/port/crypto-hash-service.interface";
import { LoginDto } from "../../infrastructure/dto/login.dto";
import { JwtAuthService } from "../../../auth/service/service/jwt.service";
import { IDesignerRepository } from "../../../designer/infrastructure/database/port/designer-repository.interface";
import { ICompanyRepository } from "../../../company/infrastructure/database/port/company-repository.interface";
export declare class UserAdapter implements IUserAdapter {
    private readonly cryptoHashService;
    private readonly userRepository;
    private readonly designerRepository;
    private readonly companyRepository;
    private readonly jwtService;
    constructor(cryptoHashService: ICryptoHashService, userRepository: IUserRepository, designerRepository: IDesignerRepository, companyRepository: ICompanyRepository, jwtService: JwtAuthService);
    create(createUserParams: CreateUserDto): Promise<IUser>;
    getUser(filter: {}): Promise<IUser>;
    loginUser(loginParams: LoginDto): Promise<{
        access_token: string;
    }>;
    private validateUser;
}
