import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoalGrade } from '../models/goal-grade.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private readonly GOAL_SETTING: string = 'pecasetting/goalsetting';

  constructor( private httpClient: HttpClient ) { }

  getGoalsGrades(): Observable<GoalGrade> {
    return this.httpClient.get<GoalGrade>(`${environment.api}${this.GOAL_SETTING}`)
    .pipe(
      map((data: any) => data)
    );
  }
}
