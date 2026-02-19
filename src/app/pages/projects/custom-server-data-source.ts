import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { AuthService } from 'src/app/services/user/auth.service';

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
    constructor(http: HttpClient, conf: any = {}, authService: AuthService) {
        super(new AuthenticatedHttpClient(http, authService) as any, conf);
    }
}
