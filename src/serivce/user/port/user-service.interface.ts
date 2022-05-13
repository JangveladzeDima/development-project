import { IClient } from "../../../client/infrastructure/entity/client.model";
import { ICompany } from "../../../company/infrastructure/entity/company/company.model";
import { IDesigner } from "../../../designer/infrastructure/entity/designer.interface";

export interface IUserService {
    getUserByRole(filter: {}, role: string): Promise<IClient | ICompany | IDesigner>

    updateUserByRole(filter: {}, updateParams: {}, role: string): Promise<void>
}