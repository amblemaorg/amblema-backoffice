import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface YearbookOrderItem {
  key: string;
  name: string;
  type: 'graphic' | 'activity';
  order: number;
  isCustom?: boolean;
}

export interface YearbookOrder {
  lapse1: YearbookOrderItem[];
  lapse2: YearbookOrderItem[];
  lapse3: YearbookOrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class YearbookOrderService {

  private readonly YEARBOOK_ORDER: string = 'pecasetting/yearbookorder';

  constructor( private httpClient: HttpClient ) { }

  getYearbookOrder(): Observable<YearbookOrder> {
    return this.httpClient.get<YearbookOrder>(`${environment.api}${this.YEARBOOK_ORDER}`);
  }

  /** items vacío restablece el orden por defecto del lapso */
  saveYearbookOrder(lapse: string, items: { key: string; order: number }[]): Observable<Partial<YearbookOrder>> {
    return this.httpClient.put<Partial<YearbookOrder>>(`${environment.api}${this.YEARBOOK_ORDER}/${lapse}`, { items });
  }
}
