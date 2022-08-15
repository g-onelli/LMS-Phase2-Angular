import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventModel } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  postApi: string;
  getAllApi: string;
  getByIdApi: string;
  deleteByIdApi: string;
  updateByIdApi: string;

  event$ = new BehaviorSubject<EventModel[]>([]);
  page$ = new BehaviorSubject<number>(0);
  size$ = new BehaviorSubject<number>(3);

  constructor (private http : HttpClient) {
    this.postApi = 'http://localhost:8080/event';
    this.getAllApi = 'http://localhost:8080/event';
    this.getByIdApi = 'http://localhost:8080/event';
    this.deleteByIdApi = 'http://localhost:8080/event';
    this.updateByIdApi = 'http://localhost:8080/event';
  }

  postEvent(event: EventModel, libId: number) : Observable<EventModel>{
    let encodedCredentials= localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.post<EventModel>(this.postApi + '/' + libId, event, httpOptions);
  }

  getAllEvent(page: number, size: number) : Observable<EventModel[]> {
    let encodedCredentials= localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.get<EventModel[]>(this.getAllApi + '?page=' + page + '&size=' + size, httpOptions);
  }

  getByIdEvent(id: number) : Observable<EventModel> {
    let encodedCredentials= localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.get<EventModel>(this.getByIdApi + '?id=' + id, httpOptions);
  }

  deleteByIdEvent(id: number) {
    let encodedCredentials= localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    this.http.delete(this.deleteByIdApi + '/' + id, httpOptions);
    console.log('Deleted: ' + id + ', change later.');
  }

  updateByIdEvent(id: number, event: EventModel) : Observable<EventModel> {
    let encodedCredentials= localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.put<EventModel>(this.updateByIdApi + '/' + id, event, httpOptions);
  }
  getEvents() : Observable<EventModel[]> {
    let encodedCredentials= localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.get<EventModel[]>(this.getAllApi + '/all', httpOptions);
  }
}
