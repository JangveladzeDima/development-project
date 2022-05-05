import { IDesignerRepository } from "../port/designer-repository.interface";
import { DesignerEntity } from "../../entity/designer.entity";
import { Repository } from "typeorm";
import { IDesigner } from "../../entity/designer.interface";
export declare class DesignerRepository implements IDesignerRepository {
    private readonly designerRepository;
    constructor(designerRepository: Repository<DesignerEntity>);
    create(designerParams: Partial<IDesigner>): Promise<IDesigner>;
    updateDesignerProfile(updateData: {
        filter: {};
        updateParams: {};
    }): Promise<void>;
}
