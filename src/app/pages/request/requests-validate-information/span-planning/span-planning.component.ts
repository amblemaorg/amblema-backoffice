import { Component, OnInit } from '@angular/core';
import { InformationDetailsComponent } from '../information-details/information-details.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-span-planning',
  templateUrl: './span-planning.component.html',
  styleUrls: ['./span-planning.component.scss']
})
export class SpanPlanningComponent extends InformationDetailsComponent {
  public canEdit = new AuthService().isAllowed( ALL_ACTIONS.REQUEST_CONTENT_APPROVAL_EDIT );

}
