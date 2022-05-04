import {Module} from "@nestjs/common";
import {DesignerAdapter} from "./adapter/designer.adapter";

@Module({
    providers: [DesignerAdapter],
    exports: [DesignerAdapter]
})
export class DomainModule {
}