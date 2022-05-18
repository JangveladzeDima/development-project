import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entity/user.entity";
import {UserRepository} from "./repository/user.repository";
import {Repository} from "typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), Repository],
    providers: [UserRepository],
    exports: [UserRepository]
})
export class UserDatabaseModule {
}