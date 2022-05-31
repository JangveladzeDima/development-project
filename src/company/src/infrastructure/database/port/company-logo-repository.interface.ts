import { ICompanyLogo } from "../../entity/logo/company-logo.model";
import { ICompanyLogoFilter } from "../../interface/company-logo-filter.interface";
import { ICompanyLogoUpdate } from "../../interface/company-logo-update.interface";

export interface ICompanyLogoRepository {
    add(logoParams: ICompanyLogo): Promise<ICompanyLogo>

    getLogo(params: { filter: {} }): Promise<ICompanyLogo>

    updateLogo(updatedLogo: ICompanyLogoFilter, updateParams: ICompanyLogoUpdate): Promise<ICompanyLogo>
}