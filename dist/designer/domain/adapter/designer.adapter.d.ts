import { IDesignerAdapter } from "../port/designer-adapter.interface";
import { IDesignerRepository } from "../../infrastructure/database/port/designer-repository.interface";
import { CreateDesignerDTO } from "../../infrastructure/dto/create-designer.dto";
import { IUserAdapter } from "../../../user/domain/port/user-adapter.interface";
export declare class DesignerAdapter implements IDesignerAdapter {
    private readonly designerRepository;
    private readonly userService;
    constructor(designerRepository: IDesignerRepository, userService: IUserAdapter);
    create(createDesignerParams: CreateDesignerDTO): Promise<any>;
}
