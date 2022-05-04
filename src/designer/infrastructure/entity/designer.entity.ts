import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../../user/infrastructure/entity/user.entity";

@Entity("designer")
export class DesignerEntity {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({
        type: "varchar"
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
        type: "date"
    })
    age: Date;

    @Column({
        type: "varchar"
    })
    address: string;

    @Column({
        type: "integer"
    })
    phone: number;

    @Column({
        type: "boolean"
    })
    isFree: boolean;

    @Column({
        type: "integer"
    })
    rating: number;


    @Column({
        type: "integer"
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

