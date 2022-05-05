import { IDesigner } from "../../entity/designer.interface";
export interface IDesignerRepository {
    create(designerParams: Partial<IDesigner>): Promise<IDesigner>;
    updateDesignerProfile(updateData: {
        filter: {};
        updateParams: {};
    }): Promise<void>;
    getDesigner(params: {
        filter: {};
    }): Promise<IDesigner>;
}
