import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IDesignerAdapter } from "../port/designer-adapter.interface";
import { DesignerRepository } from "../../infrastructure/database/repository/designer.repository";
import { IDesignerRepository } from "../../infrastructure/database/port/designer-repository.interface";
// import { UserAdapter } from "../../../../user/src/domain/adapter/user.adapter";
// import { IUserAdapter } from "../../../../user/src/domain/port/user-adapter.interface";
import { IDesigner } from "../../infrastructure/entity/designer.interface";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { DesignerRegistrationDto } from "../../infrastructure/dto/designer-registration.dto";

@Injectable()
export class DesignerAdapter implements IDesignerAdapter {
    constructor(
        // @Inject(CryptoHashService) private readonly cryptoHashService: ICryptoHashService,
        @Inject(DesignerRepository) private readonly designerRepository: IDesignerRepository,
        // @Inject(UserAdapter) private readonly userService: IUserAdapter
        @Inject('USER_SERVICE') private readonly userService: ClientProxy
    ) {
    }

    async create(createDesignerParams: DesignerRegistrationDto): Promise<IDesigner> {
        const designerByEmail = await this.designerRepository.getDesigner({
            filter: {
                email: createDesignerParams.email
            }
        });
        if (designerByEmail) {
            throw new BadRequestException("User Already Exists");
        }
        // const {hash, salt} = await this.cryptoHashService.generateHashAndSalt(createDesignerParams.password)
        // const designer = await this.designerRepository.create({...createDesignerParams, password: hash, salt})
        const designer = await this.designerRepository.create(createDesignerParams);
        const user = await firstValueFrom(this.userService.send('create-user', {
            parentID: designer.ID,
            role: "designer",
            email: designer.email
        }))
        await this.designerRepository.updateDesignerProfile({
            filter: {
                ID: designer.ID
            },
            updateParams: {
                user: user.ID
            }
        });
        return {
            ...designer,
            user: user.ID
        };
    }
}