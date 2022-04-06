import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PecaReportService {
  private readonly PECA_ACTIVITIES = `report/activities`;

  constructor(private httpClient: HttpClient) {}

  getInitialData(): Observable<any> {
    try {
      const url = `${environment.api}${this.PECA_ACTIVITIES}`;
      console.log("URL: ", url);
      return this.httpClient.get<any>(url, {
        observe: "events",
      });
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }

  getReport(body: any): Observable<any> {
    try {
      const url = `${environment.api}${this.PECA_ACTIVITIES}`;
      console.log("URL: ", url);
      return this.httpClient.post(url, body, { observe: "events" });
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }

  //   getNumberActiveSchool(
  //     startPeriodId: string,
  //     endPeriodId: string
  //   ): Observable<any> {

  //   }
}
