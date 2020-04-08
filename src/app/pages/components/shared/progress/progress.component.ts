import { Component, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/helper/loading.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements AfterViewInit, OnDestroy {

  subscription: Subscription;

  constructor(
    private loadingService:LoadingService,
    private cd: ChangeDetectorRef,
  ) {
  }

  /* This code block is for access the data loading services */
  ngAfterViewInit(): void { }

  ngOnDestroy(): void {
    if( this.subscription ) {
      this.subscription.unsubscribe(); 
    }
  }
}
