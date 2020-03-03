import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Learning, SliderMedia } from 'src/app/models/learning.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-learning',
  templateUrl: './view-learning.component.html',
  styles: []
})
export class ViewLearningComponent implements OnInit, OnChanges {


  constructor( private sanitizer: DomSanitizer ) {

  }
  @Input() learning: Learning;

  duration: string;

  options = [
    { value: 'Imagen', label: 'Imagen' },
    { value: 'Video', label: 'Video' },
  ];

  anwers: any = [
    { value: 'optionA', label: 'Opción A' },
    { value: 'optionB', label: 'Opción B' },
    { value: 'optionC', label: 'Opción C' },
    { value: 'optionD', label: 'Opción D' },
  ];

  tableMedia: any = {
    noDataMessage: 'No hay registros',
    actions: false,
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      url: {
        title: 'Archivo',
        type: 'html',
        width: '250px',
        filter: false,
        sort: false,
        valuePrepareFunction: (value, row: SliderMedia) => {
          if (row.type === this.options[0].value) {
            return this.sanitizer.bypassSecurityTrustHtml(`<img src="${value}" style="width:100px;">`);
          } else if (row.type === this.options[1].value) {
            return this.sanitizer.bypassSecurityTrustHtml(`<a href="${value}" target="_blank">${value}</a>`);
          }
        },
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
      type: {
        title: 'Tipo',
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value === this.options[0].value) {
            return 'Imagen';
          } else if (value === this.options[1].value) {
            return 'Video';
          }
        }
      }
    }
  };

  tableImage = {
    noDataMessage: 'No hay registros',
    actions: false,
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      image: {
        title: 'Imagen',
        type: 'html',
        valuePrepareFunction: (value) => {
          return this.sanitizer.bypassSecurityTrustHtml(`<img src="${value}" style="width:100px;">`);
        },
        filter: false,
        sort: false
      },
      description: {
        title: 'Descripción',
        type: 'string'
      },
    }
  };

  tableQuizzes = {
    noDataMessage: 'No hay registros',
    actions: false,
    pager: {
      display: true,
      perPage: 10
    },
    columns: {

  question: {
    title: 'Pregunta',
    type: 'string'
  },
  optionA: {
    title: 'Respuesta A',
    type: 'string',
  },
  optionB: {
    title: 'Respuesta B',
    type: 'string',
  },
  optionC: {
    title: 'Respuesta C',
    type: 'string',
  },
  optionD: {
    title: 'Respuesta D',
    type: 'string',
  },
  correctOption: {
    title: 'Respuesta',
    type: 'string',
    valuePrepareFunction: (value) => {
      if (value === this.anwers[0].value) {
        return 'A';
      } else if (value === this.anwers[1].value) {
        return 'B';
      } else if (value === this.anwers[2].value) {
        return 'C';
      } else if (value === this.anwers[3].value) {
        return 'D';
      }
    }
  }
    }
  };

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.learning) {
      const data: string = this.learning.duration.slice(0, 2) + ':' + this.learning.duration.slice(2, 4);
      this.duration = data;
    }
  }
}
