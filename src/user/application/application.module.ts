import {Module} from "@nestjs/common";
import {RolesGuard} from "../../auth/guard/role.guard";

@Module({
    providers: [RolesGuard]
})
export class ApplicationModule {
}