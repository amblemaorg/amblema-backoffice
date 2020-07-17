import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRoleComponent } from './select-role/select-role.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectStatusComponent } from './select-status/select-status.component';

@NgModule({
  declarations: [SelectRoleComponent, SelectStatusComponent],
  imports: [CommonModule, NgSelectModule, ReactiveFormsModule, FormsModule],
  exports: [SelectRoleComponent, SelectStatusComponent],
})
export class ReactiveSelectModule {}
