import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {DesignerController} from "./controller/designer.controller";
import {DomainModule} from "../domain/domain.module";

@Module({
    imports: [
        DomainModule,
        DatabaseModule
    ],
    controllers: [DesignerController],

})
export class InfrastructureModule {
}
