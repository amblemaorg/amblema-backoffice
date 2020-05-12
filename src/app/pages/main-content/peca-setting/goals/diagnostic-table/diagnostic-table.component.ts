import { Component, OnInit } from '@angular/core';
import { BaseTable } from 'src/app/helpers/base-table';
import { GoalService } from 'src/app/services/goal.service';
import { LocalData } from 'ng2-completer';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-diagnostic-table',
  templateUrl: './diagnostic-table.component.html',
  styleUrls: ['./diagnostic-table.component.scss']
})
export class DiagnosticTableComponent implements OnInit {

  // Mock data
  data = new Array<any>();
  source: LocalDataSource = new LocalDataSource();
  settings:any;

  constructor(
    private goalGradeService: GoalService
  ) {

    this.settings = {
      actions: {
        add: false,
        delete: false,
        edit: true
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        name: {
          title: 'Grados',
          type: 'string',
        },
        multiplicationsPerMin: {
          title: 'Meta - Multiplicación',
          type: 'number',
        },
        operationsPerMin: {
          title: 'Meta - Razonamiento Lógico - Matemático',
          type: 'number',
        },
        wordsPerMin: {
          title: 'Meta - Lectura',
          type: 'number',
        }
      },
    }
  }

  ngOnInit() {

    this.goalGradeService.getGoalsGrades().subscribe( response => {

      this.data.push({
        name: "Primer grado",
        multiplicationsPerMin: response.grade1.multiplicationsPerMin,
        operationsPerMin: response.grade1.operationsPerMin,
        wordsPerMin: response.grade1.wordsPerMin
      });
      
      this.data.push({
        name: "Segundo grado",
        multiplicationsPerMin: response.grade2.multiplicationsPerMin,
        operationsPerMin: response.grade2.operationsPerMin,
        wordsPerMin: response.grade2.wordsPerMin
      });

      this.data.push({
        name: "Tercer grado",
        multiplicationsPerMin: response.grade3.multiplicationsPerMin,
        operationsPerMin: response.grade3.operationsPerMin,
        wordsPerMin: response.grade3.wordsPerMin
      });

      this.data.push({
        name: "Cuarto grado",
        multiplicationsPerMin: response.grade4.multiplicationsPerMin,
        operationsPerMin: response.grade4.operationsPerMin,
        wordsPerMin: response.grade4.wordsPerMin
      });

      this.data.push({
        name: "Quinto grado",
        multiplicationsPerMin: response.grade5.multiplicationsPerMin,
        operationsPerMin: response.grade5.operationsPerMin,
        wordsPerMin: response.grade5.wordsPerMin
      });

      this.data.push({
        name: "Sexto grado",
        multiplicationsPerMin: response.grade6.multiplicationsPerMin,
        operationsPerMin: response.grade6.operationsPerMin,
        wordsPerMin: response.grade6.wordsPerMin
      });

      this.source.load( this.data );
      this.source.refresh();
    });
  }


  onAction(event: any) {

  }
}
