import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, shareReplay, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private readonly PENDING_NOTIFICATIONS = 'notifications/pending';
  private update$ = new BehaviorSubject<number>(Date.now());
  private pendingNotifications$: Observable<any>;

  constructor(private httpClient: HttpClient) {
    this.pendingNotifications$ = this.update$.asObservable().pipe(
      switchMap(() => {
        const url = `${environment.api}${this.PENDING_NOTIFICATIONS}?_t=${Date.now()}`;
        return this.httpClient.get<any>(url, {
          headers: new HttpHeaders({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          })
        }).pipe(
          catchError(err => {
            console.error('Error fetching pending notifications', err);
            return of({ records: [] });
          })
        );
      }),
      shareReplay(1)
    );
  }

  getPendingNotifications(): Observable<any> {
    return this.pendingNotifications$;
  }

  updateNotifications(): void {
    this.update$.next(Date.now());
  }
}

