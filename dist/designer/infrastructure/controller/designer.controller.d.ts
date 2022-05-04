import { CreateDesignerDTO } from "../dto/create-designer.dto";
import { UpdateDesignerDTO } from "../dto/update-designer.dto";
export declare class DesignerController {
    private readonly logger;
    constructor();
    createDesigner(user: CreateDesignerDTO): Promise<void>;
    updateDesignerProfile(data: Partial<UpdateDesignerDTO>, username: string): Promise<void>;
    getDesignerById(id: string): Promise<any>;
    getDesigners(pageNumber: "0", limit: "3"): Promise<any>;
}
