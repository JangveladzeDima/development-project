import { Injectable, NestInterceptor } from "@nestjs/common";
import { ExecutionContext, CallHandler, } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UpdateInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        const filter = request.query.updateParams
        if(filter) {
            const values = filter.split(',')
            const filterObject = {}
            for (let value of values) {
                const [first, second] = value.split('==')
                filterObject[first] = second
            }
            request.query.updateParams = filterObject
        }
        return next.handle()
    }
}