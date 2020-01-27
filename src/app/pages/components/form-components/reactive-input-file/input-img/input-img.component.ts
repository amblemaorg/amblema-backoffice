import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-img',
  template: `
    <div class="custom-file h-100 d-flex justify-content-center"
      [ngClass]="{'justify-content-lg-start': align == 'left', 'justify-content-lg-center' : align == 'center',
      'justify-content-lg-end' : align == 'right'}">
      <input type="file" name="file" id="file" class="input-file">
      <label for="file" class="btn btn-tertiary js-labelFile
      border border-info d-flex align-items-center justify-content-center">
        <i class="text-info fa fa-camera fa-2x"></i>
      </label>
    </div>
  `,
  styleUrls: ['./input-img.component.scss']
})
export class InputImgComponent implements OnInit {

  @Input() align: string | null = 'center';

  constructor() { }

  ngOnInit() {
  }

}
