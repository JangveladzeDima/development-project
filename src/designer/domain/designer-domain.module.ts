import {Module} from "@nestjs/common";
import {DesignerAdapter} from "./adapter/designer.adapter";
import {DesignerDatabaseModule} from "../infrastructure/database/designer-database.module";
import {UserDomainModule} from "../../user/src/domain/user-domain.module";
import {AuthModule} from "../../api/src/auth/auth.module";

@Module({
    imports: [DesignerDatabaseModule, UserDomainModule, AuthModule],
    providers: [DesignerAdapter],
    exports: [DesignerAdapter]
})
export class DesignerDomainModule {
}