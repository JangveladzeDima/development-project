import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    ID: number
    @Column({
        type: 'integer'
    })
    parentID: number
    @Column({
        type: 'varchar'
    })
    role: string
}