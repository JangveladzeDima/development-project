import {Injectable} from "@nestjs/common";
import {IDesignerRepository} from "../port/designer-repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {DesignerEntity} from "../../entity/designer.entity";
import {Repository} from "typeorm";
import {IDesigner} from "../../entity/designer.interface";

@Injectable()
export class DesignerRepository implements IDesignerRepository {
    constructor(
        @InjectRepository(DesignerEntity) private readonly designerRepository: Repository<DesignerEntity>
    ) {
    }

    async create(designerParams: IDesigner): Promise<void> {
        this.designerRepository.create(designerParams)
    }
}