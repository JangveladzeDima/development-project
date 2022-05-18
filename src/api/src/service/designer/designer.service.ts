import { Inject, Injectable } from "@nestjs/common";
import { IDesignerService } from "./designer-service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class DesignerService implements IDesignerService {
    constructor(
        @Inject('DESIGNER_SERVICE') private readonly designerService: ClientProxy
    ) {
    }

    async create(designerParams) {
        console.log(designerParams)
        const designer = await firstValueFrom(this.designerService.send('create-designer', designerParams))
        return designer
    }
}