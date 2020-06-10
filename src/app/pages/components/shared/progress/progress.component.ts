import { Component, ChangeDetectorRef, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/helper/loading.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements AfterViewInit, OnDestroy {

  @Output() finish = new EventEmitter<any>();

  subscription: Subscription;

  constructor(
    public loadingService: LoadingService,
    private cd: ChangeDetectorRef,
  ) {
  }

  /* This code block is for access the data loading services */
  ngAfterViewInit(): void {

    this.subscription = this.loadingService.porcent$.subscribe( response => {
      if ( response === 0 ) {

        setTimeout(() => {
          this.finish.emit();
        }, 2500);
      }
    } );
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }
}
