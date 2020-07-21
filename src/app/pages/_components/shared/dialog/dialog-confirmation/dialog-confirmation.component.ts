import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent implements OnInit {
  public active = false;
  public body: string;
  public title: string;
  public onClose: Subject<boolean>;

  public constructor(
      private bsModalRef: BsModalRef
  ) { }

  public ngOnInit(): void {
      this.onClose = new Subject();
  }

  public showConfirmationModal(title: string, body: string): void {
      this.title = title;
      this.body =  body;
      this.active = true;
  }

  public onConfirm(): void {
      this.active = false;
      this.onClose.next(true);
      this.bsModalRef.hide();
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
}
