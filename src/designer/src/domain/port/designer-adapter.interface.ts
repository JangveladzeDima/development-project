import { IDesigner } from "../../infrastructure/entity/designer.interface";
import { DesignerRegistrationDto } from "../../infrastructure/dto/designer-registration.dto";

export interface IDesignerAdapter {
    create(createDesignerParams: DesignerRegistrationDto): Promise<IDesigner>;
}