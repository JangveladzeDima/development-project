import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DesignerEntity} from "../entity/designer.entity";


@Module({
    imports: [TypeOrmModule.forFeature([DesignerEntity])]
})

export class DatabaseModule {
}