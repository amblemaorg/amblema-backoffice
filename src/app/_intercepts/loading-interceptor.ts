import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../services/helper/loading.service';

/** Encabezado interno: la petición no muestra la pantalla de carga global. */
export const SKIP_LOADING_HEADER = 'X-Skip-Loading';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptorService {

    activeRequests = 0;

    constructor(
        private loadingScreenService: LoadingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler, event: HttpEvent<any>): Observable<HttpEvent<any>> {

        // Consultas en segundo plano (p. ej. el avance de una carga de Vademécum cada 3 s):
        // sin pantalla de carga. El encabezado se quita antes de enviar la petición.
        if (request.headers.has(SKIP_LOADING_HEADER)) {
            return next.handle(request.clone({ headers: request.headers.delete(SKIP_LOADING_HEADER) }));
        }

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
