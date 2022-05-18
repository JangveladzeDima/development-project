import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Inject, Injectable} from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        // @Inject(UserRepository) private readonly userRepository: IUserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'racxa',
        });
    }

    async validate(payload: {
        email: string,
        role: string
    }) {
        // const user = await this.userRepository.getUser({
        //     filter: {
        //         email: payload.email
        //     }
        // })
        // if (user === null) {
        //     return false
        // }
        // if (user.role !== payload.role) {
        //     return false
        // }
        return payload
    }
}