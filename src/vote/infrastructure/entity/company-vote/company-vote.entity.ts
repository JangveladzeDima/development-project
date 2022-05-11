import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../../../user/infrastructure/entity/user.entity";
import {CompanyEntity} from "../../../../company/infrastructure/entity/company/copmany.entity";

@Entity('company-vote')
export class CompanyVoteEntity {
    @PrimaryGeneratedColumn()
    ID: number
    @ManyToOne(() => UserEntity, user => user.ID)
    @JoinColumn({
        name: 'userID'
    })
    userID: number
    @Column({
        type: 'integer'
    })
    score: number
    @ManyToOne(() => CompanyEntity, company => company.ID)
    @JoinColumn({
        name: 'companyID'
    })
    companyID: number

}