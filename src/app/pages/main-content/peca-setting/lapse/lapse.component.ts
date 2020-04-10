import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LapseActivitiesService } from 'src/app/services/lapse-activities.service';

@Component({
  selector: 'app-lapse',
  templateUrl: './lapse.component.html'
})
export class LapseComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(
    private lapseActivityService: LapseActivitiesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(response => {

      this.lapseActivityService.getActivity(response.id, response.lapse).subscribe(value => {
        console.log(value);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
