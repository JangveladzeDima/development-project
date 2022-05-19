import { HttpException, Inject, Injectable } from "@nestjs/common";
import { IDesignerService } from "./designer-service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { DesignerRegistrationDto } from "../../dto/designer/designer-registration.dto";
import { IDesigner } from "../../interface/designer/designer.interface";

@Injectable()
export class DesignerService implements IDesignerService {
    constructor(
        @Inject('DESIGNER_SERVICE') private readonly designerService: ClientProxy
    ) {
    }

    async create(designerParams: DesignerRegistrationDto): Promise<IDesigner> {
        const designer: IDesigner = await firstValueFrom(this.designerService.send('designer-create', designerParams))
        if (designer.hasOwnProperty('response')) {
            throw new HttpException(designer['response']['message'], designer['response']['statusCode'])
        }
        return designer
    }
}