import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DesignerEntity } from "../entity/designer.entity";
import { DesignerRepository } from "./repository/designer.repository";
import { Repository } from "typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([DesignerEntity]), Repository],
  providers: [DesignerRepository],
  exports: [DesignerRepository]
})

export class DesignerDatabaseModule {
}