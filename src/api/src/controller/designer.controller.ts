import { Body, Controller, Inject, Post } from "@nestjs/common";
import { DesignerService } from "../service/designer/designer.service";
import { IDesignerService } from "../service/designer/designer-service.interface";
import { DesignerRegistrationDto } from "../dto/designer/designer-registration.dto";

@Controller('/designer')
export class DesignerController {
    constructor(
        @Inject(DesignerService) private readonly designerService: IDesignerService
    ) {
    }

    @Post('/registration')
    async designerRegistration(@Body() designerParams: DesignerRegistrationDto) {
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