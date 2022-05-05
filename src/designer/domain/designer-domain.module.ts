import {Module} from "@nestjs/common";
import {DesignerAdapter} from "./adapter/designer.adapter";
import {DesignerDatabaseModule} from "../infrastructure/database/designer-database.module";
import {UserDomainModule} from "../../user/domain/user-domain.module";

@Module({
    imports: [DesignerDatabaseModule, UserDomainModule],
    providers: [DesignerAdapter],
    exports: [DesignerAdapter]
})
export class DesignerDomainModule {
}