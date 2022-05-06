import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CompanyEntity} from "../entity/company/copmany.entity";
import {Repository} from "typeorm";
import {CompanyRepository} from "./repository/company.repository";

@Module({
    imports: [TypeOrmModule.forFeature([CompanyEntity]), Repository],
    providers: [CompanyRepository],
    exports: [CompanyRepository]
})
export class CompanyDatabaseModule {
}