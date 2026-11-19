import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import {
  YearbookDownloadService,
  YearbookDownloadStatus,
} from 'src/app/services/yearbook-download.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-yearbook-download-toggle',
  templateUrl: './yearbook-download-toggle.component.html',
})
export class YearbookDownloadToggleComponent implements ViewCell, OnInit, OnDestroy {
  @Input() value: any;
  @Input() rowData: any;

  status: YearbookDownloadStatus | undefined;
  saving = false;
  canEdit = new AuthService().isAllowed(ALL_ACTIONS.PROJECT_EDIT);

  private subscription: Subscription;

  constructor(
    private yearbookService: YearbookDownloadService,
    private toastr: CustomToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.yearbookService.statusByProject$.subscribe((map) => {
      this.status = map[this.rowData.id];
      // ng2-smart-table renderiza la celda con OnPush: sin esto la vista no se actualiza
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onChange(event: Event): void {
    if (!this.status || this.saving) {
      return;
    }
    const input = event.target as HTMLInputElement;
    const checked = input.checked;
    this.saving = true;
    this.cdr.markForCheck();

    this.yearbookService.setEnabled(this.status.pecaId, checked).subscribe(
      () => {
        this.saving = false;
        this.cdr.markForCheck();
        this.toastr.updateSuccess(
          'AmbLeMario',
          checked
            ? 'Descarga habilitada para el coordinador'
            : 'Descarga deshabilitada para el coordinador'
        );
      },
      (err: any) => {
        this.saving = false;
        this.cdr.markForCheck();
        input.checked = !checked;
        this.toastr.error(
          'AmbLeMario',
          err?.error?.msg || 'No se pudo actualizar la descarga'
        );
      }
    );
  }
}
