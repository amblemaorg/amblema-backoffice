import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { GoalService } from 'src/app/services/goal.service';

@Component({
  selector: 'app-diagnostic-table',
  templateUrl: './diagnostic-table.component.html',
  styleUrls: ['./diagnostic-table.component.scss']
})
export class DiagnosticTableComponent extends BaseTable implements OnInit {

  // Mock data
  data = new Array<any>();

  constructor(
    private goalGradeService:GoalService
  ) {
    super();

    this.settings.actions = {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      //  Fake action
      delete: true,
      custom: [
        { name: this.ACTION.EDIT, title: `<i class="nb-edit"></i>` },
      ]
    };

    this.settings.columns = {
      grades: {
        title: 'Grados',
        type: 'text'
      },
      goals: {
        title: 'Metas',
        type: 'text'
      }
    };

    this.source.load( this.data );
  }

  ngOnInit() {

    this.goalGradeService.getGoalsGrades().subscribe( response => {

      console.log( response ); 

      this.data.push({
        
      })

    } );

    console.log()
  }


  onAction(event: any) {

  }
}
