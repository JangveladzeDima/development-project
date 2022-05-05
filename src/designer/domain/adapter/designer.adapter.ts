import {Inject, Injectable} from "@nestjs/common";
import {IDesignerAdapter} from "../port/designer-adapter.interface";
import {DesignerRepository} from "../../infrastructure/database/repository/designer.repository";
import {IDesignerRepository} from "../../infrastructure/database/port/designer-repository.interface";
import {CreateDesignerDTO} from "../../infrastructure/dto/create-designer.dto";
import {UserAdapter} from "../../../user/domain/adapter/user.adapter";
import {IUserAdapter} from "../../../user/domain/port/user-adapter.interface";
import {CryptoHashService} from "../../../auth/service/service/crypto-hash.service";
import {ICryptoHashService} from "../../../auth/service/port/crypto-hash-service.interface";

@Injectable()
export class DesignerAdapter implements IDesignerAdapter {
    constructor(
        @Inject(CryptoHashService) private readonly cryptoHashService: ICryptoHashService,
        @Inject(DesignerRepository) private readonly designerRepository: IDesignerRepository,
        @Inject(UserAdapter) private readonly userService: IUserAdapter
    ) {
    }

    async create(createDesignerParams: CreateDesignerDTO): Promise<any> {
        const {hash, salt} = await this.cryptoHashService.generateHashAndSalt(createDesignerParams.password)
        const {email, ID} = await this.designerRepository.create({...createDesignerParams, password: hash, salt})
        const user = await this.userService.create({parentID: ID, role: 'designer', email})
        await this.designerRepository.updateDesignerProfile({
            filter: {
                ID
            },
            updateParams: {
                user: user.ID
            }
        })
    }
}