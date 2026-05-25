import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { AuthService } from 'src/app/services/user/auth.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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

export class CustomServerDataSource extends ServerDataSource {
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
                    
                    if (fieldConf['field'] === 'phase') {
                        const searchLower = searchValue.toLowerCase();
                        if (searchLower.includes('pec')) {
                            searchValue = '2';
                        } else if (searchLower.includes('pas')) {
                            searchValue = '1';
                        }
                    } else if (fieldConf['field'] === 'status') {
                        const searchLower = searchValue.toLowerCase();
                        if (searchLower.includes('inac')) {
                            searchValue = '2';
                        } else if (searchLower.includes('act')) {
                            searchValue = '1';
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


