import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormModeService {
  private mode$: BehaviorSubject<any> = new BehaviorSubject({
    label: 'Registrar',
    value: '1',
  });

  setMode(value = '1' || '2') {
    this.mode$.next({
      label: value === '1' ? 'Registrar' : 'Editar',
      value,
    });
  }

  getMode(): Observable<any> {
    return of(this.mode$.value);
  }
}
