import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,} from "typeorm";
import {UserEntity} from "../../../../user/src/infrastructure/entity/user.entity";

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    ID: number
    @Column({
        type: 'varchar',
        unique: true
    })
    name: string
    @Column({
        type: 'varchar'
    })
    address: string
    @Column({
        type: 'varchar'
    })
    identificationCode: string
    @Column({
        type: 'varchar'
    })
    phoneNumber: string
    @Column({
        type: 'date'
    })
    dataOfEstablishment: Date
    @Column({
        type: 'int',
        default: 0
    })
    rating: number
    @Column({
        type: 'varchar',
        unique: true
    })
    email: string
    @OneToOne(() => UserEntity, user => user.ID)
    @JoinColumn()
    user: number
    @Column({
        type: 'varchar'
    })
    password: string

    @Column({
        type: 'varchar'
    })
    salt: string
}