import { CreateDesignerDTO } from "../dto/create-designer.dto";
import { IDesignerAdapter } from "../../domain/port/designer-adapter.interface";
export declare class DesignerController {
    private readonly designerAdapter;
    private readonly logger;
    constructor(designerAdapter: IDesignerAdapter);
    createDesigner(designer: CreateDesignerDTO): Promise<any>;
}
