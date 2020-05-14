import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserReportService } from 'src/app/services/report/user-report.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sponsor-report',
  templateUrl: './sponsor-report.component.html',
  styleUrls: ['./sponsor-report.component.scss']
})
export class SponsorReportComponent implements OnInit, OnDestroy {

  subscriptionService:Subscription; 

  settings:any = {

  };

  source:LocalDataSource = new LocalDataSource();
  data: any;

  constructor(
    private userReporteService: UserReportService ) { }

  async ngOnInit() {

    this.subscriptionService =  this.userReporteService.getUserReport('0', '1').subscribe( response => {

      console.log( response );

      // this.subscriptionService = this.userReporteService.getUserReport('0', '0').subscribe( response => {
      //   console.log( response ) ;
      // } ); 
      
    } );
  }
  
  async ngOnDestroy() {
    if( this.subscriptionService ) this.subscriptionService.unsubscribe(); 
  }
}