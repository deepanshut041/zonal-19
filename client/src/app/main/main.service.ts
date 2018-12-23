import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class MainService {
  domain:string

  constructor(private http:HttpClient) {
    if (isDevMode()) {
        this.domain = 'http://localhost:8000';
      } else {
        this.domain = '.';
      }
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
}
