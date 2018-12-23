import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from '../shared/assets';


@Injectable()
export class MainService {
  domain:string

  constructor(private http:HttpClient) {
    this.domain = DOMAIN
  }

  getEventsShort():Observable<any[]>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
    });
    return this.http.get<any[]>(this.domain + '/api/events/short_list/', {headers: headers})
  }

  getEvent(id: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.get<any>(this.domain + '/api/events/' + id + '/', {headers: headers})
  }

  getEvents(): Observable<any[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.get<any[]>(this.domain + '/api/events/', {headers: headers})
  }

  regsiter(body:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post(this.domain + '/api/registrations/', body, {headers: headers})
  }
}
