import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { WebAboutState } from 'src/app/store/web-about.action';
import { Observable, Subscription } from 'rxjs';
import { AboutUsPage } from 'src/app/models/web/web-about.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, OnDestroy {

  @Select( WebAboutState.webAbout ) data$: Observable<AboutUsPage>;
  subscription: Subscription;

  form: FormGroup = new FormGroup({
    aboutUsText: new FormControl(''),
    environmentText: new FormControl(''),
    readingText: new FormControl(''),
    mathText: new FormControl('')
  });

  constructor( private store: Store ) { }

  ngOnInit() {
    
    this.subscription = this.data$.subscribe( response => {
    
    } ); 

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
