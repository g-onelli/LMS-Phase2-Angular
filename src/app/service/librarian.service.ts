import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LibrarianId } from '../auth/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {
  getIdApi: string;
  constructor(private http: HttpClient) {
    this.getIdApi=environment.serverUrl +'/librarianId';
   }
  getIdByCredentials():Observable<LibrarianId> {
    let encodedCredentials= localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.get<LibrarianId>(this.getIdApi,httpOptions)
  }
}
