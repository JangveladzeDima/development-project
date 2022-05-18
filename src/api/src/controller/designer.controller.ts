import { Body, Controller, Inject, Post } from "@nestjs/common";
import { DesignerService } from "../service/designer/designer.service";
import { IDesignerService } from "../service/designer/designer-service.interface";

@Controller('/designer')
export class DesignerController {
    constructor(
        @Inject(DesignerService) private readonly designerService: IDesignerService
    ) {
    }

    @Post('/registration')
    async designerRegistration(@Body() designerParams) {
        try {
            const designer = await this.designerService.create(designerParams)
            return {
                designer,
                message: 'ok'
            }
        } catch (err) {
            throw err
        }
    }
}