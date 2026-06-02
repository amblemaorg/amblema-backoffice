import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { tap } from 'rxjs/operators';

export interface NotificationModel {
  notifications: any[];
}

export class GetPendingNotifications {
  static readonly type = '[Notification] Get Pending Notifications';
}

@State<NotificationModel>({
  name: 'notifications',
  defaults: {
    notifications: []
  }
})
@Injectable()
export class NotificationState {

  @Selector()
  static allNotifications(state: NotificationModel): any[] {
    return state.notifications;
  }

  constructor(private notificationService: NotificationService) {}

  @Action(GetPendingNotifications)
  getPendingNotifications(ctx: StateContext<NotificationModel>) {
    return this.notificationService.getPendingNotifications().pipe(
      tap(response => {
        ctx.setState({
          notifications: response
        });
      })
    );
  }
}
