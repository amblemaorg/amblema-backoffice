import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-initial-workshop-details",
  templateUrl: "./initial-workshop-details.component.html",
  styleUrls: ["./initial-workshop-details.component.scss"],
})
export class InitialWorkshopDetailsComponent implements OnInit {
  data = {

    // -- General data --

    

    // -- Details data --
    descripton: "lorem",
    images: [
      {
        url: "",
        description: "",
        state: "",
        status: "",
      },
    ],
  };

  constructor() {}

  ngOnInit() {}
}
