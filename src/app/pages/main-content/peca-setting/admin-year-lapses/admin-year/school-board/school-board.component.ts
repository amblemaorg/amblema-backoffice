import { Component } from "@angular/core";
import { BaseTable } from "src/app/helpers/base-table";
import { EnrolledSchool } from "src/app/models/_enrolled/enrolled-school.model";
import { Observable } from "rxjs";
import { GeneralEnrolledState } from "src/app/store/_enrolled/enrolled.action";
import { Select } from "@ngxs/store";
import { EnrolledService } from "src/app/services/enrolled.service";

@Component({
  selector: "app-school-board",
  templateUrl: "./school-board.component.html",
  styles: [],
})
export class SchoolBoardComponent extends BaseTable {
  @Select(GeneralEnrolledState.enrolledSchools) data$: Observable<
    EnrolledSchool[]
  >;

  constructor(private enrolledServices: EnrolledService) {
    super("form-admin-school");

    this.settings.actions.custom = [
      { name: this.ACTION.DELETE, title: '<i class="nb-trash"></i>' },
    ];

    this.settings.columns = {
      name: {
        title: "Nombre de la escuela",
        type: "string",
      },
      code: {
        title: "Código del plantel",
        type: "string",
      },
    };
  }

  onAction(event: any) {
    this.enrolledServices.removeEnrolledSchool(event.data.projectId).subscribe(
      (response) => console.log(response),
      (err) => console.log(err)
    );
  }
}
