import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WorkPosition, WorkPositionList } from "../_models/work-position.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WorkPositionService {
  constructor(private httpClient: HttpClient) {}

  getWorkPosition(): Observable<WorkPositionList> {
    return this.httpClient
      .get<WorkPositionList>(`${environment.api}` + "work-position")
      .pipe(map((data: any) => data));
  }

  updateWorkPosition(id: string, data: any): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.api}` + "work-position/" + id,
      data
    );
  }
  saveWorkPosition(data: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}` + "work-position", data);
  }
  deleteWorkPosition(id: string): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.api}` + "work-position/" + id
    );
  }
}
