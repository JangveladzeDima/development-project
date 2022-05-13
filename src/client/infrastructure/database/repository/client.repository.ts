import { Injectable } from "@nestjs/common";
import { IClientRepository } from "../port/client-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientEntity } from "../../entity/client.entity";
import { Repository } from "typeorm";
import { IClient } from "../../entity/client.model";
import { IClientFilter } from "../../interface/client-filter.interface";
import { IClientUpdate } from "../../interface/client-update.interface";

@Injectable()
export class ClientRepository implements IClientRepository {
    constructor(
        @InjectRepository(ClientEntity) private readonly clientRepository: Repository<ClientEntity>
    ) {
    }

    async create(client: Partial<IClient>): Promise<IClient> {
        return this.clientRepository.save(client)
    }

    async update(filter: IClientFilter, updateParams: IClientUpdate): Promise<any> {
        return this.clientRepository.update(filter, updateParams)
    }
}