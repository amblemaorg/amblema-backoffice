import { Component, Input, OnChanges } from '@angular/core';
import { PROJECT_PHASE } from 'src/app/_helpers/convention/phase';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthService } from 'src/app/services/user/auth.service';
import { SchoolYearEnrolledState } from 'src/app/store/_enrolled/school-year-enrolled.action';
import { SchoolYearEnrolled } from 'src/app/_models/_enrolled/school-year.model';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

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
  selectedSchoolYears: any;

  @Select(SchoolYearEnrolledState.schoolYearsEnrolled)
  data$: Observable<SchoolYearEnrolled[]>;

  deliveryData: SyncHistoricalData = {};

  public url = environment.web;
  public place = `historical`;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnChanges(): void {
    this.phase =
      this.data.phase === PROJECT_PHASE.STEPS.CODE
        ? PROJECT_PHASE.STEPS.VALUE
        : PROJECT_PHASE.PECA.VALUE;
  }

  onNavigate(): void {
    window.open(
      this.url +
        this.place +
        '/' +
        this.deliveryData.idUser + '/' +
        this.deliveryData.idProject + '/' +
        this.deliveryData.token + '/' +
        this.deliveryData.yearSchool + '/' +
        this.deliveryData.step,
      '_blank'
    );
  }

  onClickStep(value: number): void {
    this.deliveryData = {
      ...this.deliveryData,
      idProject: this.data.id,
      idUser: this.authService.getIdUser(),
      step: value,
      token: this.authService.getJwtToken(),
    };
  }

  onSelectedYear() {
    this.deliveryData = {
      ...this.deliveryData,
      yearSchool: this.selectedSchoolYears.id,
    };

    localStorage.setItem('historicalData', JSON.stringify(this.deliveryData));
    console.log(JSON.parse(localStorage.getItem('historicalData')));
  }
}

export interface SyncHistoricalData {
  idUser?: string;
  token?: string;
  idProject?: string;
  yearSchool?: string;
  step?: number; // <-- Steps = 1, PECA = 2
}
