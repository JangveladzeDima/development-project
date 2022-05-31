import { Controller, Get, Inject, Logger } from "@nestjs/common";
import { CompanyRegistrationDto } from "../dto/company-registration.dto";
import { CompanyAdapter } from "../../domain/adapter/company.adapter";
import { ICompanyAdapter } from "../../domain/port/company-adapter.interface";
import { Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices'
import { ICompanyFilter } from "../interface/company-filter.interface";
import { ICompanyLogo } from "../entity/logo/company-logo.model";
import { ICompanyUpdate } from "../interface/company-update.interface";

@Controller('/company')
export class CompanyController {
    logger = new Logger(CompanyController.name)

    constructor(
        @Inject(CompanyAdapter) private readonly companyAdapter: ICompanyAdapter
    ) {
    }

    @MessagePattern('company-create')
    async companyRegistration(
        @Payload() registrationParams: CompanyRegistrationDto, @Ctx() context: RmqContext
    ): Promise<any> {
        try {
            const company = await this.companyAdapter.registration(registrationParams)
            return company
        } catch (err) {
            this.logger.error(err.message)
            return err
        }
    }

    @MessagePattern('add-company-logo')
    async addCompanyLogo(
        @Payload() logoParams: ICompanyLogo
    ) {
        try {
            const logo = await this.companyAdapter.addCompanyLogo(logoParams)
            return logo
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    @MessagePattern('update')
    async updateCompany(@Payload() updateParams: { updateCompanyEmail: string; updatedParams: ICompanyUpdate }) {
        try {
            const updatedCompany = await this.companyAdapter.updateCompany(updateParams)
            return updatedCompany
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    @Get('/')
    @MessagePattern('company-get')
    async getCompany(@Payload() filter: ICompanyFilter) {
        try {
            const company = await this.companyAdapter.getCompany(filter)
            return company
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}