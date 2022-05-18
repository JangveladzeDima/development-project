import { IClient } from "../../infrastructure/entity/client.model";

export interface IClientAdapter {
    create(client: Partial<IClient>): Promise<IClient>
}