import {
  Controller,
  Logger,
  Inject
} from "@nestjs/common";
import { DesignerAdapter } from "../../domain/adapter/designer.adapter";
import { IDesignerAdapter } from "../../domain/port/designer-adapter.interface";
import { Ctx, Payload, RmqContext, MessagePattern } from "@nestjs/microservices";

@Controller("designer")
export class DesignerController {
  private readonly logger = new Logger(DesignerController.name);

  constructor(
    @Inject(DesignerAdapter) private readonly designerAdapter: IDesignerAdapter
  ) {
  }

  @MessagePattern("create-designer")
  async createDesigner(@Payload() designer, @Ctx() context: RmqContext): Promise<any> {
    try {
      console.log(designer);
      const newDesigner = await this.designerAdapter.create(designer);
      return {
        newDesigner,
        message: "Designer created"
      };
    } catch (err) {
      this.logger.error(err.message);
      throw err;
    }
  }
}