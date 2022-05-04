import {Module} from "@nestjs/common";
import {RolesGuard} from "./guards/role.guard";

@Module({
    providers: [RolesGuard]
})
export class ApplicationModule {
}