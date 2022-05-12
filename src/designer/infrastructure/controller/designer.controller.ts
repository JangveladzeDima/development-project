import {
    Body,
    Controller,
    Post,
    Logger,
    Inject,
} from "@nestjs/common";
import {CreateDesignerDTO} from "../dto/create-designer.dto";
import {DesignerAdapter} from "../../domain/adapter/designer.adapter";
import {IDesignerAdapter} from "../../domain/port/designer-adapter.interface";

@Controller("designer")
export class DesignerController {
    private readonly logger = new Logger(DesignerController.name);

    constructor(
        @Inject(DesignerAdapter) private readonly designerAdapter: IDesignerAdapter
    ) {
    }

    @Post("/register")
    async createDesigner(
        @Body() createDesignerParams: CreateDesignerDTO): Promise<any> {
        try {
            const designer = await this.designerAdapter.create(createDesignerParams)
            return {
                designer,
                message: "created"
            }
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}