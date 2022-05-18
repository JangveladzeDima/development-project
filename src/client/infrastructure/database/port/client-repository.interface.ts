import { IClient } from "../../entity/client.model";
import { IClientFilter } from "../../interface/client-filter.interface";
import { IClientUpdate } from "../../interface/client-update.interface";

export interface IClientRepository {
    create(client: Partial<IClient>): Promise<IClient>

    update(filter: IClientFilter, updateParams: IClientUpdate): Promise<any>

    getClient(params: { filter: IClientFilter }): Promise<IClient>
}