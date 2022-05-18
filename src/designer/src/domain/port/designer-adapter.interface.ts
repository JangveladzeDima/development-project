import { IDesigner } from "../../infrastructure/entity/designer.interface";

export interface IDesignerAdapter {
  create(createDesignerParams): Promise<IDesigner>;
}