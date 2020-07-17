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
      iconPack: 'eva',
      icon: 'checkmark-outline',
      duration: this.duration
    });
  }

  updateSuccess(title: string, content: string): void {
    this.toastrService.primary(content, title, {
      position: this.position,
      iconPack: 'eva',
      icon: 'flip-2-outline',
      duration: this.duration
    });
  }

  deleteRegister(title: string, content: string): void {
    this.toastrService.warning( content, title, {
      position: this.position,
      iconPack: 'eva',
      icon: 'alert-circle-outline',
      duration: this.duration
    });
  }

  error(title: string, content: string): void {

    this.toastrService.danger( content, title, {
      position: this.position,
      iconPack: 'eva',
      icon: 'alert-triangle-outline',
      duration: this.duration
    });
  }

  info( title: string, content: string ): void {

    this.toastrService.info( content, title, {
      position: this.position,
      iconPack: 'eva',
      icon: 'alert-triangle-outline',
      duration: this.duration,
    });
  }
}
