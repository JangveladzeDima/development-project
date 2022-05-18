import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IClientAdapter } from "../port/client-adapter.interface";
import { IClient } from "../../infrastructure/entity/client.model";
import { UserRepository } from "../../../user/infrastructure/database/repository/user.repository";
import { IUserRepository } from "../../../user/infrastructure/database/port/user-repository.interface";
import { CryptoHashService } from "../../../auth/service/service/crypto-hash.service";
import { ICryptoHashService } from "../../../auth/service/port/crypto-hash-service.interface";
import { ClientRepository } from "../../infrastructure/database/repository/client.repository";
import { IClientRepository } from "../../infrastructure/database/port/client-repository.interface";

@Injectable()
export class ClientAdapter implements IClientAdapter {
    constructor(
        @Inject(UserRepository) private readonly userRepository: IUserRepository,
        @Inject(CryptoHashService) private readonly cryptoHashService: ICryptoHashService,
        @Inject(ClientRepository) private readonly clientRepository: IClientRepository
    ) {}

    async create(client: Partial<IClient>): Promise<IClient> {
        const user = await this.userRepository.getUser({
            filter: {
                email: client.email
            }
        })
        if (user) {
            throw new BadRequestException('email already exists')
        }
        const { hash, salt } = await this.cryptoHashService.generateHashAndSalt(client.password)
        client.password = hash
        client.salt = salt
        const newClient = await this.clientRepository.create(client)
        const newUser = await this.userRepository.create({
            parentID: newClient.ID,
            role: 'client',
            email: newClient.email
        })
        await this.clientRepository.update({
            email: client.email
        }, {
            userID: newUser.ID
        })
        return newClient
    }
}