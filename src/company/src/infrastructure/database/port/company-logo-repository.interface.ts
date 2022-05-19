import { ICompanyLogo } from "../../entity/logo/company-logo.model";

export interface ICompanyLogoRepository {
    // add(logoParams: ICompanyLogo): Promise<ICompanyLogo>

    getLogo(params: { filter: {} }): Promise<ICompanyLogo>

    // updateLogo(updatedLogo: {}, updateParams:{}):Promise<ICompanyLogo>
}