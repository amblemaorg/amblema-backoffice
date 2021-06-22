import { Injectable } from '@angular/core';
import { NbToastrService, NbToastRef } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {

  private readonly position: any = 'top-right';
  private readonly duration: number = 6000;

  public durationInfo = 0;


  constructor(private toastrService?: NbToastrService) { }

  registerSuccess(title: string, content: string): void {
    this.toastrService.success(content, title, {
      position: this.position,
      icon: {
        icon: 'checkmark-outline',
        pack: 'eva'
      },
      duration: this.duration
    });
  }

  updateSuccess(title: string, content: string): void {
    this.toastrService.primary(content, title, {
      position: this.position,
      icon: {
        icon: 'flip-2-outline',
        pack: 'eva'
      },
      duration: this.duration
    });
  }

  deleteRegister(title: string, content: string): void {
    this.toastrService.warning( content, title, {
      position: this.position,
      icon: {
        icon: 'alert-circle-outline',
        pack: 'eva'
      },
      duration: this.duration
    });
  }

  error(title: string, content: string): void {

    this.toastrService.danger( content, title, {
      position: this.position,
      icon: {
        icon: 'alert-triangle-outline',
        pack: 'eva'
      },
      duration: this.duration
    });
  }

  info( title: string, content: string ): void {

    this.toastrService.info( content, title, {
      position: this.position,
      icon: {
        icon: 'alert-triangle-outline',
        pack: 'eva'
      },
      duration: this.duration,
    });
  }
}
