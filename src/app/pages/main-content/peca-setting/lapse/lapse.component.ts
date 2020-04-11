import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LapseActivitiesService } from 'src/app/services/lapse-activities.service';
import { Store } from '@ngxs/store';
import { SelectActivity } from 'src/app/store/lapse-activities.action';

@Component({
  selector: 'app-lapse',
  templateUrl: './lapse.component.html'
})
export class LapseComponent implements OnInit, OnDestroy {

  subscription: Subscription;


  lapse: string;
  id: string;

  constructor(
    private store: Store,
    private lapseActivityService: LapseActivitiesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(response => {

      this.lapse = response.lapse;
      this.id = response.id;

      this.lapseActivityService.getActivity(response.id, response.lapse).subscribe(value => {
        this.store.dispatch( new SelectActivity ( value ) );
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
