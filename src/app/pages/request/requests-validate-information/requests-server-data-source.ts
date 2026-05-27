import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { AuthService } from 'src/app/services/user/auth.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { REQUEST_STATUS } from 'src/app/_helpers/convention/request-status';

export class AuthenticatedHttpClient {
    constructor(private http: HttpClient, private authService: AuthService) { }

    get(url: string, options: any = {}) {
        let headers = options.headers || new HttpHeaders();
        const token = this.authService.getJwtToken();

        if (token) {
            if (!(headers instanceof HttpHeaders)) {
                headers = new HttpHeaders(headers);
            }
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        options.headers = headers;
        return this.http.get(url, options);
    }
}

export class RequestsServerDataSource extends ServerDataSource {
    private activeSubscription: Subscription;
    loading: boolean = false;

    constructor(http: HttpClient, conf: any = {}, authService: AuthService) {
        super(new AuthenticatedHttpClient(http, authService) as any, conf);
    }

    getElements(): Promise<any> {
        this.loading = true;

        if (this.activeSubscription) {
            this.activeSubscription.unsubscribe();
        }

        return new Promise((resolve) => {
            this.activeSubscription = this.requestElements()
                .pipe(
                    map((res) => {
                        this.lastRequestCount = this.extractTotalFromResponse(res);
                        this.data = this.extractDataFromResponse(res);
                        return this.data;
                    })
                )
                .subscribe(
                    (data) => {
                        this.loading = false;
                        resolve(data);
                    },
                    (err) => {
                        this.loading = false;
                        resolve(this.data || []);
                    }
                );
        });
    }

    protected addFilterRequestParams(httpParams: HttpParams): HttpParams {
        if (this.filterConf.filters) {
            this.filterConf.filters.forEach((fieldConf) => {
                if (fieldConf['search']) {
                    let searchValue = fieldConf['search'];
                    
                    if (fieldConf['field'] === 'status') {
                        const searchLower = searchValue.toLowerCase();
                        if (searchLower.includes('pend')) {
                            searchValue = REQUEST_STATUS.PENDING.CODE;
                        } else if (searchLower.includes('aprob') || searchLower.includes('acept')) {
                            searchValue = REQUEST_STATUS.ACCEPTED.CODE;
                        } else if (searchLower.includes('rech')) {
                            searchValue = REQUEST_STATUS.REJECTED.CODE;
                        } else if (searchLower.includes('can')) {
                            searchValue = REQUEST_STATUS.CANCELLED.CODE;
                        }
                    }
                    
                    httpParams = httpParams.set(
                        this.conf.filterFieldKey.replace('#field#', fieldConf['field']),
                        searchValue
                    );
                }
            });
        }
        return httpParams;
    }
}
