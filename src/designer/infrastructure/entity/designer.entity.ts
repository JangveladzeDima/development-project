import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../../user/src/infrastructure/entity/user.entity";

@Entity("designer")
export class DesignerEntity {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({
        type: "varchar",
        unique: true
    })
    email: string;

    @Column({
        type: "varchar"
    })
    firstname: string;

    @Column({
        type: "varchar"
    })
    lastname: string;

    @Column({
        type: "varchar"
    })
    password: string;

    @Column({
        type: 'varchar',
        default: ''
    })
    salt: string

    @Column({
        type: "date"
    })
    birthday: Date;

    @Column({
        type: "varchar",
        default: ''
    })
    address: string;

    @Column({
        type: "integer",
        default: 0
    })
    phone: number;

    @Column({
        type: "boolean",
        default: true
    })
    isFree: boolean;

    @Column({
        type: "integer",
        default: 0
    })
    rating: number;


    @Column({
        type: "integer",
        default: -1
    })
    avatarID: number;

    @OneToOne(() => UserEntity, user => user.ID)
    @JoinColumn()
    user: number

    // @Column({
    //   type: "integer"
    // })
    // developmentID: number;

}

