import { Body, Controller, Get, Post, Patch, Logger, Param, Query } from "@nestjs/common";
import { CreateDesignerDTO } from "../dto/create-designer.dto";
import { UpdateDesignerDTO } from "../dto/update-designer.dto";

@Controller("designer")
export class DesignerController {
  private readonly logger = new Logger(DesignerController.name);

  constructor() {
  }

  @Post("/register")
  async createDesigner(
    @Body() user: CreateDesignerDTO): Promise<void> {
  }

  @Patch("/update-profile")
  async updateDesignerProfile(
    @Body() data: Partial<UpdateDesignerDTO>,
    @Param("username") username: string): Promise<void> {
  }

  @Get("/:id")
  async getDesignerById(
    @Param("id") id: string): Promise<any> {
  }

  @Get("/list")
  async getDesigners(
    @Query("pageNumber") pageNumber: "0",
    @Query("limit")
      limit: "3"): Promise<any> {
  }
}