import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomToastrService } from './helper/custom-toastr.service';

export interface YearbookDownloadStatus {
  projectId: string;
  pecaId: string;
  yearbookDownloadEnabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class YearbookDownloadService {

  private readonly URL = 'pecaprojects';

  // Key: projectId
  statusByProject$ = new BehaviorSubject<Record<string, YearbookDownloadStatus>>({});

  constructor(
    private httpClient: HttpClient,
    private toastr: CustomToastrService
  ) { }

  loadActive(): void {
    this.httpClient
      .get<{ records: YearbookDownloadStatus[] }>(`${environment.api}${this.URL}/yearbook-download`)
      .subscribe(
        (response) => {
          const map: Record<string, YearbookDownloadStatus> = {};
          (response.records || []).forEach((record) => {
            map[record.projectId] = record;
          });
          this.statusByProject$.next(map);
        },
        (err: any) => {
          this.statusByProject$.next({});
          if (err?.status === 403) {
            // Roles sin permiso de administración (p. ej. PROJECT_VIEW): sin aviso.
            return;
          }
          this.toastr.error(
            'AmbLeMario',
            err?.error?.msg || 'No se pudo cargar el estado de la descarga'
          );
        }
      );
  }

  setEnabled(
    pecaId: string,
    enabled: boolean
  ): Observable<YearbookDownloadStatus & { schoolYearActive: boolean }> {
    return this.httpClient
      .patch<YearbookDownloadStatus & { schoolYearActive: boolean }>(
        `${environment.api}${this.URL}/${pecaId}/yearbook-download`,
        { yearbookDownloadEnabled: enabled }
      )
      .pipe(
        tap(() => {
          const current = this.statusByProject$.value;
          const projectId = Object.keys(current).find(
            (key) => current[key].pecaId === pecaId
          );
          if (projectId) {
            this.statusByProject$.next({
              ...current,
              [projectId]: { ...current[projectId], yearbookDownloadEnabled: enabled },
            });
          }
        })
      );
  }
}
