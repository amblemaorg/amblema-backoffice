import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading$: Subject<boolean> = new Subject();
  porcent$: Subject<number> = new Subject();

  startLoading() {
    this.loading$.next(true);
  }

  stopLoading() {
    this.loading$.next(false);
  }

  setPorcent( porcent: number ) {
    this.porcent$.next(porcent);
  }
}
