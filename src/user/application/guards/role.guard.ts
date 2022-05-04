import {CanActivate, Injectable,ExecutionContext} from "@nestjs/common";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if(!roles){
            return true
        }
        const request=context.switchToHttp().getRequest()
        console.log(request)
        return true
    }
}