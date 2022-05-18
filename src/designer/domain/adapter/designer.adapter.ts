import {BadRequestException, Inject, Injectable} from "@nestjs/common";
import {IDesignerAdapter} from "../port/designer-adapter.interface";
import {DesignerRepository} from "../../infrastructure/database/repository/designer.repository";
import {IDesignerRepository} from "../../infrastructure/database/port/designer-repository.interface";
import {CreateDesignerDTO} from "../../infrastructure/dto/create-designer.dto";
import {UserAdapter} from "../../../user/src/domain/adapter/user.adapter";
import {IUserAdapter} from "../../../user/src/domain/port/user-adapter.interface";
import {CryptoHashService} from "../../../api/src/auth/service/service/crypto-hash.service";
import {ICryptoHashService} from "../../../api/src/auth/service/port/crypto-hash-service.interface";
import {IDesigner} from "../../infrastructure/entity/designer.interface";

@Injectable()
export class DesignerAdapter implements IDesignerAdapter {
    constructor(
        @Inject(CryptoHashService) private readonly cryptoHashService: ICryptoHashService,
        @Inject(DesignerRepository) private readonly designerRepository: IDesignerRepository,
        @Inject(UserAdapter) private readonly userService: IUserAdapter
    ) {
    }

    async create(createDesignerParams: CreateDesignerDTO): Promise<IDesigner> {
        const designerByEmail = await this.designerRepository.getDesigner({
            filter: {
                email: createDesignerParams.email
            }
        })
        if (designerByEmail) {
            throw new BadRequestException('User exists boshyo')
        }
        const {hash, salt} = await this.cryptoHashService.generateHashAndSalt(createDesignerParams.password)
        const designer = await this.designerRepository.create({...createDesignerParams, password: hash, salt})
        const user = await this.userService.create({parentID: designer.ID, role: 'designer', email: designer.email})
        await this.designerRepository.updateDesignerProfile({
            filter: {
                ID: designer.ID
            },
            updateParams: {
                user: user.ID
            }
        })
        return {
            ...designer,
            user: user.ID
        }
    }
}