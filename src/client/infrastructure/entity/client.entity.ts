import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../../user/infrastructure/entity/user.entity";

@Entity('client')
export class ClientEntity {
    @PrimaryGeneratedColumn()
    ID: number
    @Column({
        type: 'varchar',
    })
    firstname: string
    @Column({
        type: 'varchar'
    })
    lastname: string
    @Column({
        type: 'varchar'
    })
    email: string
    @Column({
        type: 'varchar'
    })
    password: string
    @Column({
        type: 'varchar'
    })
    salt: string
    @Column({
        type: 'varchar',
        nullable: true
    })
    passportNumber: string
    @OneToOne(() => UserEntity, user => user.ID)
    @JoinColumn({
        name: 'userID'
    })
    userID: number

}