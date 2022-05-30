import {
    Controller,
    Logger,
    Inject
} from "@nestjs/common";
import { DesignerAdapter } from "../../domain/adapter/designer.adapter";
import { IDesignerAdapter } from "../../domain/port/designer-adapter.interface";
import { Ctx, Payload, RmqContext, MessagePattern } from "@nestjs/microservices";
import { DesignerRegistrationDto } from "../dto/designer-registration.dto";
import { IDesignerFilter } from "../interface/designer-filter.interface";

@Controller("designer")
export class DesignerController {
    private readonly logger = new Logger(DesignerController.name);

    constructor(
        @Inject(DesignerAdapter) private readonly designerAdapter: IDesignerAdapter
    ) {
    }

    @MessagePattern("designer-create")
    async createDesigner(@Payload() designer: DesignerRegistrationDto, @Ctx() context: RmqContext): Promise<any> {
        try {
            const newDesigner = await this.designerAdapter.create(designer);
            return newDesigner
        } catch (err) {
            this.logger.error(err.message);
            return err;
        }
    }

    @MessagePattern('get')
    async getDesigner(@Payload() designerFilter: IDesignerFilter) {
        try {
            const designer = await this.designerAdapter.get(designerFilter)
            return designer
        } catch (err) {
            this.logger.error(err.message)
            return err
        }
    }
}