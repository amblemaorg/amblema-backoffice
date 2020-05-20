import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-diagnostic-table',
  templateUrl: './diagnostic-table.component.html',
  styleUrls: ['./diagnostic-table.component.scss']
})
export class DiagnosticTableComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  data = new Array<any>();
  source: LocalDataSource = new LocalDataSource();
  settings: any;


  constructor(
    private toastr: CustomToastrService,
    private goalGradeService: GoalService
  ) {

    this.settings = {
      actions: {
        columnTitle: 'Acciones',
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
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        name: {
          title: 'Grados',
          type: 'string',
          editable: false
        },
        multiplicationsPerMin: {
          title: 'Meta de multiplicación',
          type: 'number',
          editable: true
        },
        operationsPerMin: {
          title: 'Meta de razonamiento lógico matemático',
          type: 'number',
          editable: true
        },
        wordsPerMin: {
          title: 'Meta de lectura',
          type: 'number',
          editable: true
        }
      },
    };
  }

  ngOnDestroy(): void {
    if ( this.subscription ) { this.subscription.unsubscribe(); }
  }

  ngOnInit() {

    this.subscription = this.goalGradeService.getGoalsGrades().subscribe(response => {

      this.data.push({
        name: 'Primer grado',
        multiplicationsPerMin: response.grade1.multiplicationsPerMin,
        operationsPerMin: response.grade1.operationsPerMin,
        wordsPerMin: response.grade1.wordsPerMin
      });

      this.data.push({
        name: 'Segundo grado',
        multiplicationsPerMin: response.grade2.multiplicationsPerMin,
        operationsPerMin: response.grade2.operationsPerMin,
        wordsPerMin: response.grade2.wordsPerMin
      });

      this.data.push({
        name: 'Tercer grado',
        multiplicationsPerMin: response.grade3.multiplicationsPerMin,
        operationsPerMin: response.grade3.operationsPerMin,
        wordsPerMin: response.grade3.wordsPerMin
      });

      this.data.push({
        name: 'Cuarto grado',
        multiplicationsPerMin: response.grade4.multiplicationsPerMin,
        operationsPerMin: response.grade4.operationsPerMin,
        wordsPerMin: response.grade4.wordsPerMin
      });

      this.data.push({
        name: 'Quinto grado',
        multiplicationsPerMin: response.grade5.multiplicationsPerMin,
        operationsPerMin: response.grade5.operationsPerMin,
        wordsPerMin: response.grade5.wordsPerMin
      });

      this.data.push({
        name: 'Sexto grado',
        multiplicationsPerMin: response.grade6.multiplicationsPerMin,
        operationsPerMin: response.grade6.operationsPerMin,
        wordsPerMin: response.grade6.wordsPerMin
      });

      this.source.load(this.data);
    });
  }

  onSaveConfirm(event) {

    const prepareData: any = {
      grade1: {
        multiplicationsPerMin: event.source.data[0].multiplicationsPerMin,
        operationsPerMin: event.source.data[0].operationsPerMin,
        wordsPerMin: event.source.data[0].wordsPerMin
      },
      grade2: {

        multiplicationsPerMin: event.source.data[1].multiplicationsPerMin,
        operationsPerMin: event.source.data[1].operationsPerMin,
        wordsPerMin: event.source.data[1].wordsPerMin
      },
      grade3: {
        multiplicationsPerMin: event.source.data[2].multiplicationsPerMin,
        operationsPerMin: event.source.data[2].operationsPerMin,
        wordsPerMin: event.source.data[2].wordsPerMin
      },
      grade4: {
        multiplicationsPerMin: event.source.data[3].multiplicationsPerMin,
        operationsPerMin: event.source.data[3].operationsPerMin,
        wordsPerMin: event.source.data[3].wordsPerMin
      },
      grade5: {
        multiplicationsPerMin: event.source.data[4].multiplicationsPerMin,
        operationsPerMin: event.source.data[4].operationsPerMin,
        wordsPerMin: event.source.data[4].wordsPerMin
      },
      grade6: {
        multiplicationsPerMin: event.source.data[5].multiplicationsPerMin,
        operationsPerMin: event.source.data[5].operationsPerMin,
        wordsPerMin: event.source.data[5].wordsPerMin
      },
    };

    if ( event.newData.name === 'Primer grado' ) {
      prepareData.grade1.multiplicationsPerMin = event.newData.multiplicationsPerMin;
      prepareData.grade1.operationsPerMin = event.newData.operationsPerMin;
      prepareData.grade1.wordsPerMin = event.newData.wordsPerMin;
    } else if (event.newData.name === 'Segundo grado') {
      prepareData.grade2.multiplicationsPerMin = event.newData.multiplicationsPerMin;
      prepareData.grade2.operationsPerMin = event.newData.operationsPerMin;
      prepareData.grade2.wordsPerMin = event.newData.wordsPerMin;
    }  else if (event.newData.name === 'Tercer grado') {
      prepareData.grade3.multiplicationsPerMin = event.newData.multiplicationsPerMin;
      prepareData.grade3.operationsPerMin = event.newData.operationsPerMin;
      prepareData.grade3.wordsPerMin = event.newData.wordsPerMin;
    }  else if (event.newData.name === 'Cuarto grado') {
      prepareData.grade4.multiplicationsPerMin = event.newData.multiplicationsPerMin;
      prepareData.grade4.operationsPerMin = event.newData.operationsPerMin;
      prepareData.grade4.wordsPerMin = event.newData.wordsPerMin;
    } else if (event.newData.name === 'Quinto grado') {
      prepareData.grade5.multiplicationsPerMin = event.newData.multiplicationsPerMin;
      prepareData.grade5.operationsPerMin = event.newData.operationsPerMin;
      prepareData.grade5.wordsPerMin = event.newData.wordsPerMin;
    } else if (event.newData.name === 'Sexto grado') {
      prepareData.grade6.multiplicationsPerMin = event.newData.multiplicationsPerMin;
      prepareData.grade6.operationsPerMin = event.newData.operationsPerMin;
      prepareData.grade6.wordsPerMin = event.newData.wordsPerMin;
    }

    this.subscription = this.goalGradeService.updateGoalsGrades( prepareData ).subscribe( response => {
      this.toastr.updateSuccess('Actualización', 'Metas configuradas');
    } );

    event.confirm.resolve(); // <-- Return to previous stock status


  }

}
