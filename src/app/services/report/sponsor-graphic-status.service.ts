import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class SponsorGraphicStatusService {
  private readonly ACTIVE_SPONSOR_GRAPHICS = `statistics/activesponsorsgraphic/`;
  private readonly INACTIVE_SPONSOR_GRAPHICS = `statistics/inactivesponsorsgraphic/`;

  constructor(private httpClient: HttpClient) {}

  getActiveSponsor(
    startPeriodId: string,
    endPeriodId: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.api}${this.ACTIVE_SPONSOR_GRAPHICS}${startPeriodId}/${endPeriodId}`,
      {
        reportProgress: true,
        observe: "events",
      }
    );
  }

  getInactiveSponsor(
    startPeriodId: string,
    endPeriodId: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.api}${this.INACTIVE_SPONSOR_GRAPHICS}${startPeriodId}/${endPeriodId}`,
      {
        reportProgress: true,
        observe: "events",
      }
    );
  }
}
