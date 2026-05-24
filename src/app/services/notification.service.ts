import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly PENDING_NOTIFICATIONS = 'pendingnotifications';

  constructor(private httpClient: HttpClient) {}

  getPendingNotifications(): Observable<any[]> {
    const url = `${environment.api}${this.PENDING_NOTIFICATIONS}`;
    return this.httpClient.get<any>(url).pipe(
      map(data => data.records)
    );
  }
}
