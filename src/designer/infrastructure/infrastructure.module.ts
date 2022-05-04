import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {DesignerController} from "./controller/designer.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [DesignerController],
    providers: []

})
export class InfrastructureModule {
}
