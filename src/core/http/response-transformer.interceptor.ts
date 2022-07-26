import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { NestResponse } from "./nest-response";

@Injectable()
export class ReponseTransformerInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;
  
  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((controllerResponse: NestResponse) => {
        if(controllerResponse instanceof NestResponse) {
          const ctx = context.switchToHttp();
          const response = ctx.getResponse();
          const { status, headers, body } = controllerResponse;

          const nameOfHeaders = Object.getOwnPropertyNames(headers);
          nameOfHeaders.forEach(headerName => {
            const valueOfHeader = headers[headerName];
            this.httpAdapter.setHeader(response, headerName, valueOfHeader);
          });

          this.httpAdapter.status(response, status);
          return body;
        }
        return controllerResponse;
      }
    )
  )}
}