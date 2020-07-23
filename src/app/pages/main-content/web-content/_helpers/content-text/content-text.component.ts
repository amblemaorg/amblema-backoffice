import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-content-text',
  templateUrl: './content-text.component.html',
})
export class ContentTextComponent implements OnInit {
  @Input() about?: number;
  @Input() enviroment?: number;
  @Input() reading?: number;
  @Input() math?: number;

  @Input() data: any = {}; // <-- To update
  @Input() form: FormGroup;

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  constructor(private formBuilder: FormBuilder) {}
}
