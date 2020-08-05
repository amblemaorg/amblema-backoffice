import { Component, OnInit } from '@angular/core';
import { InformationDetailsComponent } from '../information-details/information-details.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-special-activity-details',
  templateUrl: './special-activity-details.component.html',
  styleUrls: ['./special-activity-details.component.scss']
})
export class SpecialActivityDetailsComponent extends InformationDetailsComponent {
  public canEdit = new AuthService().isAllowed( ALL_ACTIONS.REQUEST_CONTENT_APPROVAL_EDIT );

}
