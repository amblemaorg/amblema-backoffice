import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.scss']
})
export class InputImgComponent implements OnInit {

  @Input() align: string | null = 'center';

  constructor() { }

  ngOnInit() {
  }

}
