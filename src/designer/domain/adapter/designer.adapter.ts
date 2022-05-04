import {Injectable} from "@nestjs/common";
import {IDesignerAdapter} from "../port/designer-adapter.interface";

@Injectable()
export class DesignerAdapter implements IDesignerAdapter {
    constructor() {
    }

    async create(): Promise<any> {
        console.log('adana')
    }
}