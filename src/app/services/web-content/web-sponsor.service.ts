import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebSponsorService {

  private readonly WEB_SPONSOR = 'webcontent?page=sponsorPage';

  constructor( private httpClient: HttpClient ) { }
}
