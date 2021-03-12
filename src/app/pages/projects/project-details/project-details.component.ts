import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PROJECT_PHASE } from 'src/app/_helpers/convention/phase';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthService } from 'src/app/services/user/auth.service';
import { SchoolYearEnrolledState } from 'src/app/store/_enrolled/school-year-enrolled.action';
import { SchoolYearEnrolled } from 'src/app/_models/_enrolled/school-year.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnChanges, OnInit {
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
 
  ngOnInit() {
    
    this.showYear = false;
    this.selectedSchoolYears = null; 
    this.deliveryData = {}; 
  }

  ngOnChanges(): void {
    this.phase =
      this.data.phase === PROJECT_PHASE.STEPS.CODE
        ? PROJECT_PHASE.STEPS.VALUE
        : PROJECT_PHASE.PECA.VALUE;
  }

  onNavigate(): void {
    this.showYear = false;
    window.open(
      this.url +
        this.place +
        '/' +
        this.deliveryData.idUser + '/' +
        this.deliveryData.idProject + '/' +
        this.deliveryData.refreshToken + '/' +
        this.deliveryData.schoolYear + '/' +
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
      refreshToken: this.authService.getRefreshToken()
    };
  }

  onSelectedYear() {
    this.deliveryData = {
      ...this.deliveryData,
      schoolYear: this.selectedSchoolYears.id,
    };

    localStorage.setItem('historicalData', JSON.stringify(this.deliveryData));

  }
}

export interface SyncHistoricalData {
  idUser?: string;
  token?: string;
  refreshToken?: string;
  idProject?: string;
  schoolYear?: string;
  step?: number; // <-- Steps = 1, PECA = 2
}
