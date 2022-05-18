import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../../user/src/infrastructure/entity/user.entity";

@Entity('votes')
export class VotesEntity {
    @PrimaryGeneratedColumn()
    ID: number
    @OneToOne(() => UserEntity, user => user.ID)
    @JoinColumn({
        name: 'voterID'
    })
    voterID: number
    @OneToOne(() => UserEntity, user => user.ID)
    @JoinColumn({
        name: 'votedToID'
    })
    votedToID: number
    @Column({
        type: 'integer'
    })
    score: number
}