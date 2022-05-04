import { IDesignerAdapter } from "../port/designer-adapter.interface";
export declare class DesignerAdapter implements IDesignerAdapter {
    constructor();
    create(): Promise<any>;
}
