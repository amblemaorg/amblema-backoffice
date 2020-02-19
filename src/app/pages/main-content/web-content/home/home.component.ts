import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { WebHomeState } from 'src/app/store/web-home.action';
import { Observable, Subscription } from 'rxjs';
import { WebHome } from 'src/app/models/web/web-home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  @Select( WebHomeState.webHome ) data$: Observable<WebHome>;
  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.data$.subscribe( response => {
      console.log(response);
    } )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
}
