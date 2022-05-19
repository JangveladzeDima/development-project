import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CompanyEntity} from "../entity/company/copmany.entity";
import {Repository} from "typeorm";
import {CompanyRepository} from "./repository/company.repository";
import {CompanyLogoEntity} from "../entity/logo/company-logo.entity";
import {CompanyLogoRepository} from "./repository/company-logo.repository";

@Module({
    imports: [TypeOrmModule.forFeature([CompanyEntity, CompanyLogoEntity]), Repository],
    providers: [
        CompanyRepository,
        CompanyLogoRepository
    ],
    exports: [
        CompanyRepository,
        CompanyLogoRepository
    ]
})
export class CompanyDatabaseModule {
}