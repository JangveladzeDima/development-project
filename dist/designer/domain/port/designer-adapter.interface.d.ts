import { CreateDesignerDTO } from "../../infrastructure/dto/create-designer.dto";
export interface IDesignerAdapter {
    create(createDesignerParams: CreateDesignerDTO): Promise<void>;
}
