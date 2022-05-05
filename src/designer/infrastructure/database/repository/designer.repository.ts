import {Injectable} from "@nestjs/common";
import {IDesignerRepository} from "../port/designer-repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {DesignerEntity} from "../../entity/designer.entity";
import {Repository} from "typeorm";
import {IDesigner} from "../../entity/designer.interface";
import {UpdateDesignerDTO} from "../../dto/update-designer.dto";

@Injectable()
export class DesignerRepository implements IDesignerRepository {
    constructor(
        @InjectRepository(DesignerEntity) private readonly designerRepository: Repository<DesignerEntity>
    ) {
    }

    async create(designerParams: Partial<IDesigner>): Promise<IDesigner> {
        return this.designerRepository.save(designerParams)
    }

    async updateDesignerProfile(updateData: { filter: {}; updateParams: {} }): Promise<void> {
        await this.designerRepository.update(updateData.filter, updateData.updateParams)
    }

}