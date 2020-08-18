import { Component, OnInit } from '@angular/core';
import { InformationDetailsComponent } from '../information-details/information-details.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-yearbook-details',
  templateUrl: './yearbook-details.component.html',
  styleUrls: [`./yearbook-details.component.scss`],
})
export class YearbookDetailsComponent extends InformationDetailsComponent {
  public canEdit = new AuthService().isAllowed( ALL_ACTIONS.REQUEST_CONTENT_APPROVAL_EDIT );
}
