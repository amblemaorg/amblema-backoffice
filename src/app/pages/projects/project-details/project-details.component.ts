import { Component, Input, OnChanges } from '@angular/core';
import { PROJECT_PHASE } from 'src/app/_helpers/convention/phase';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthService } from 'src/app/services/user/auth.service';
import { SchoolYearEnrolledState } from 'src/app/store/_enrolled/school-year-enrolled.action';
import { SchoolYearEnrolled } from 'src/app/_models/_enrolled/school-year.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnChanges {
  @Input() data: any;

  PROJECT_PHASE = PROJECT_PHASE;
  phase: string;

  showYear = false;

  @Select(SchoolYearEnrolledState.schoolYearsEnrolled)
  data$: Observable<SchoolYearEnrolled[]>;

  deliveryData: SyncHistoryData = { };

  constructor(
    private authService: AuthService
  ) {

  }

  ngOnChanges(): void {
    this.phase =
      this.data.phase === PROJECT_PHASE.STEPS.CODE
        ? PROJECT_PHASE.STEPS.VALUE
        : PROJECT_PHASE.PECA.VALUE;
  }

  onNavigate(): void {
    window.open('https://www.google.com', '_blank');
  }

  onClickStep( value: number ): void {

    this.deliveryData = {
      ...this.deliveryData,
      idUser: this.authService.getIdUser(),
      step: value,
      token: this.authService.getJwtToken()
    };
  }
}

export interface  SyncHistoryData {
  idUser?: string;
  token?: string;
  idProject?: string;
  yearSchool?: string;
  step?: number; // <-- Steps = 1, PECA = 2
 }
