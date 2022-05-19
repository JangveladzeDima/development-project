import { DesignerRegistrationDto } from "../../dto/designer/designer-registration.dto";
import { IDesigner } from "../../interface/designer/designer.interface";

export interface IDesignerService {
    create(designerParams: DesignerRegistrationDto): Promise<IDesigner>
}