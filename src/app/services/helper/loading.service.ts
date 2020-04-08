import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService implements OnInit {
  loading$: Subject<boolean> = new Subject();
  porcent$: Subject<number> = new Subject(); 

  ngOnInit(): void {
    this.porcent$.next(0); 
  }

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
