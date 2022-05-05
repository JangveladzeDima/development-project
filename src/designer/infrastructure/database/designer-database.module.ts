import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DesignerEntity} from "../entity/designer.entity";
import {DesignerRepository} from "./repository/designer.repository";


@Module({
    imports: [TypeOrmModule.forFeature([DesignerEntity])],
    providers: [DesignerRepository],
    exports: [DesignerRepository]
})

export class DesignerDatabaseModule {
}