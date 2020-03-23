import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-file',
  template: `
    <div class="form-group">
      <input type="file" name="file" id="file" class="input-file">
      <label for="file" nbButton outline status="info" class="btn btn-outline-info js-labelFile">
        <nb-icon icon="file-text-outline" class="mr-2"></nb-icon>
        <span class="js-fileName">Cargar archivo</span>
      </label>
    </div>
  `,
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
