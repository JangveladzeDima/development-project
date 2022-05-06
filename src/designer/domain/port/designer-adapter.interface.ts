import {CreateDesignerDTO} from "../../infrastructure/dto/create-designer.dto";
import {IDesigner} from "../../infrastructure/entity/designer.interface";


export interface IDesignerAdapter {
    create(createDesignerParams: CreateDesignerDTO): Promise<IDesigner>
}