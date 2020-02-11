import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {

  private readonly position: any = 'bottom-left';
  private readonly duration: number = 6000;

  constructor(private toastrService: NbToastrService) { }

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
}
