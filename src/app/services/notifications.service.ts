import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private readonly PENDING_NOTIFICATIONS = 'notifications/pending';

  constructor(private httpClient: HttpClient) { }

  getPendingNotifications(): Observable<any> {
    const url = `${environment.api}${this.PENDING_NOTIFICATIONS}`;
    return this.httpClient.get<any>(url);
  }
}
