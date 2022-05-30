import { IDesigner } from "../../infrastructure/entity/designer/designer.interface";
import { DesignerRegistrationDto } from "../../infrastructure/dto/designer-registration.dto";
import { IDesignerFilter } from "../../infrastructure/interface/designer-filter.interface";

export interface IDesignerAdapter {
    create(createDesignerParams: DesignerRegistrationDto): Promise<IDesigner>

    get(filter: IDesignerFilter): Promise<IDesigner>
}