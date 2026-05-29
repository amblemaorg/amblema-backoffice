import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private readonly PENDING_NOTIFICATIONS = 'notifications/pending';
  private update$ = new BehaviorSubject<void>(null);
  private pendingNotifications$: Observable<any>;

  constructor(private httpClient: HttpClient) {
    const url = `${environment.api}${this.PENDING_NOTIFICATIONS}`;
    this.pendingNotifications$ = this.update$.asObservable().pipe(
      switchMap(() => this.httpClient.get<any>(url)),
      shareReplay(1)
    );
  }

  getPendingNotifications(): Observable<any> {
    return this.pendingNotifications$;
  }

  updateNotifications(): void {
    this.update$.next(null);
  }
}
