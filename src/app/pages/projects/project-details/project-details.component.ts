import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PROJECT_PHASE } from 'src/app/helpers/convention/phase';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnChanges {

  @Input() data: any;

  PROJECT_PHASE = PROJECT_PHASE;
  phase: string;

  ngOnInit(): void { }

  ngOnChanges(): void {

    console.log(this.data);
    this.phase = this.data.phase === PROJECT_PHASE.STEPS.CODE ? PROJECT_PHASE.STEPS.VALUE : PROJECT_PHASE.PECA.VALUE;
  }
}
