import {Body, Controller, Get, Post, Patch, Logger, Param, Query, Inject} from "@nestjs/common";
import {CreateDesignerDTO} from "../dto/create-designer.dto";
import {UpdateDesignerDTO} from "../dto/update-designer.dto";
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
            await this.designerAdapter.create(createDesignerParams)
            return {message: "created"}
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }

    }

    // @Patch("/update-profile")
    // async updateDesignerProfile(
    //     @Body() data: Partial<UpdateDesignerDTO>,
    //     @Param("username") username: string): Promise<void> {
    // }
    //
    // @Get("/:id")
    // async getDesignerById(
    //     @Param("id") id: string): Promise<any> {
    // }
    //
    // @Get("/list")
    // async getDesigners(
    //     @Query("pageNumber") pageNumber: "0",
    //     @Query("limit")
    //         limit: "3"): Promise<any> {
    // }
}