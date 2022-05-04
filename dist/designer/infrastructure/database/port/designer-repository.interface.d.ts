import { IDesigner } from "../../entity/designer.interface";
export interface IDesignerRepository {
    create(designerParams: IDesigner): Promise<void>;
}
