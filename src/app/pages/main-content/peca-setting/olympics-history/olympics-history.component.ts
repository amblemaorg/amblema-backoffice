import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OlympicsHistoryService } from 'src/app/services/olympics-history.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-olympics-history',
  templateUrl: './olympics-history.component.html',
  styleUrls: ['./olympics-history.component.scss']
})
export class OlympicsHistoryComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private olympicsHistoryService: OlympicsHistoryService,
    private toastr: CustomToastrService
  ) {
    this.form = this.fb.group({
      mathOlympics: this.fb.group({
        regionalClassified: [0, [Validators.required, Validators.min(0)]],
        regionalGold: [0, [Validators.required, Validators.min(0)]],
        regionalSilver: [0, [Validators.required, Validators.min(0)]],
        regionalBronze: [0, [Validators.required, Validators.min(0)]],
        nationalClassified: [0, [Validators.required, Validators.min(0)]],
        nationalGold: [0, [Validators.required, Validators.min(0)]],
        nationalSilver: [0, [Validators.required, Validators.min(0)]],
        nationalBronze: [0, [Validators.required, Validators.min(0)]]
      }),
      readingOlympics: this.fb.group({
        regionalClassified: [0, [Validators.required, Validators.min(0)]],
        regionalGold: [0, [Validators.required, Validators.min(0)]],
        regionalSilver: [0, [Validators.required, Validators.min(0)]],
        regionalBronze: [0, [Validators.required, Validators.min(0)]],
        nationalClassified: [0, [Validators.required, Validators.min(0)]],
        nationalGold: [0, [Validators.required, Validators.min(0)]],
        nationalSilver: [0, [Validators.required, Validators.min(0)]],
        nationalBronze: [0, [Validators.required, Validators.min(0)]]
      })
    });
  }

  ngOnInit() {
    this.loadOlympicsHistory();
  }

  loadOlympicsHistory() {
    this.loading = true;
    this.olympicsHistoryService.getOlympicsHistory().subscribe(data => {
        if (data) {
            this.form.patchValue({
                mathOlympics: data.mathOlympics || {},
                readingOlympics: data.readingOlympics || {}
            });
        }
        this.loading = false;
    }, err => {
        this.loading = false;
        this.toastr.error('Error', 'No se pudo cargar el histórico');
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.olympicsHistoryService.saveOlympicsHistory(this.form.value).subscribe(res => {
        this.toastr.registerSuccess('Correcto', 'Histórico guardado exitosamente');
        this.loading = false;
      }, err => {
        this.toastr.error('Error', 'No se pudo guardar el histórico');
        this.loading = false;
      });
    }
  }

}
