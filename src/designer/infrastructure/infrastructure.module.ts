import {Module} from "@nestjs/common";
import {DesignerDatabaseModule} from "./database/designer-database.module";
import {DesignerController} from "./controller/designer.controller";
import {DesignerDomainModule} from "../domain/designer-domain.module";

@Module({
    imports: [
        DesignerDomainModule,
        DesignerDatabaseModule
    ],
    controllers: [DesignerController],

})
export class InfrastructureModule {
}
