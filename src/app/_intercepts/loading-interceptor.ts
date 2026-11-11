import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../services/helper/loading.service';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptorService {

    activeRequests = 0;

    constructor(
        private loadingScreenService: LoadingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler, event: HttpEvent<any>): Observable<HttpEvent<any>> {

        if (this.activeRequests === 0) {
            this.loadingScreenService.startLoading();
        }

        this.activeRequests++;

        return next.handle(request).pipe(
            tap((response: HttpEvent<any>) => {
                switch (response.type) {
                    case HttpEventType.UploadProgress:
                        this.loadingScreenService.setPorcent(Math.round(response.loaded / response.total * 100));
                        break;
                    case HttpEventType.Response:
                        setTimeout(() => {
                            this.loadingScreenService.setPorcent(0);
                        }, 2000);
                        break;
                }

            }),
            finalize(() => {
                this.activeRequests--;
                if (this.activeRequests === 0) {
                    this.loadingScreenService.stopLoading();
                }
            })
        );
    }
}
