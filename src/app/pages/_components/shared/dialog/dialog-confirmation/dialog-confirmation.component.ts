import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent implements OnInit {
  public active = false;
  public info: string;
  public body: string;
  public title: string;
  public onClose: Subject<boolean>;
  public ERROR_CODE = 419;

  public constructor(
    private bsModalRef: BsModalRef,
    private toast: CustomToastrService
  ) {  }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public showConfirmationModal(
    title: string,
    body: string,
    info?: string
  ): void {
    this.title = title;
    this.body = body;
    this.info = info;
    this.active = true;
  }

  public onConfirm(): void {
    this.onClose.next(true);
  }

  public onCancel(): void {
    this.active = false;
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  public hideConfirmationModal(): void {
    this.active = false;
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

  public errorDelete(error: HttpErrorResponse): void {
    if (error.status === this.ERROR_CODE) {
      this.body = error.error.msg;
      this.toast.error('Error', error.error.msg);
    }
  }
}
