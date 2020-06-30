import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRoleComponent } from './select-role/select-role.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectRoleComponent],
  imports: [CommonModule, NgSelectModule, ReactiveFormsModule, FormsModule ],
  exports: [SelectRoleComponent],
})
export class ReactiveSelectModule {}
