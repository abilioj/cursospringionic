import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();
        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;//verificano se a requisição e de fato para api e não para bucket do S3
        if (localUser && requestToAPI) {
            //console.log("clona a requisição");//clona a requisição pra que ele retorna com autentificação
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }
        else {
            return next.handle(req);
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,//Declarar o provider do interceptor la no App.Modulo (pode ser no mesmo arquivo do interceptor)
    multi: true,
};
