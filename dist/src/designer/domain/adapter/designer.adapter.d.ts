import { IDesignerAdapter } from "../port/designer-adapter.interface";
import { IDesignerRepository } from "../../infrastructure/database/port/designer-repository.interface";
import { CreateDesignerDTO } from "../../infrastructure/dto/create-designer.dto";
import { IUserAdapter } from "../../../user/domain/port/user-adapter.interface";
import { ICryptoHashService } from "../../../auth/service/port/crypto-hash-service.interface";
import { IDesigner } from "../../infrastructure/entity/designer.interface";
export declare class DesignerAdapter implements IDesignerAdapter {
    private readonly cryptoHashService;
    private readonly designerRepository;
    private readonly userService;
    constructor(cryptoHashService: ICryptoHashService, designerRepository: IDesignerRepository, userService: IUserAdapter);
    create(createDesignerParams: CreateDesignerDTO): Promise<IDesigner>;
    getDesigner(params: {
        filter: {};
    }): Promise<IDesigner>;
}
