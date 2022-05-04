import {CanActivate, Injectable, ExecutionContext} from "@nestjs/common";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if (!roles) {
            return true
        }
        const {user} = context.switchToHttp().getRequest()
        for(let i=0;i<roles.length;i++){
            if(roles[i]===user.role){
                return true
            }
        }
        return false
    }
}