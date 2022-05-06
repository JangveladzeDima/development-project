import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CompanyEntity} from "../company/copmany.entity";

@Entity('company-logo')
export class CompanyLogoEntity {
    @PrimaryGeneratedColumn()
    ID: number
    @OneToOne(() => CompanyEntity, company => company.ID)
    @JoinColumn()
    company: number
    @Column()
    logo: string
}
