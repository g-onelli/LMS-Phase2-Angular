import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeeModel } from '../model/fee.model';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  postFeeApi: string;
  getFeesApi: string;
  getFeesByPatronIdApi: string;
  getFeesByPatronUsernameApi: string;
  updateFeeApi: string;

  fee$ = new BehaviorSubject<FeeModel[]>([]);

  constructor(private http: HttpClient) {
    this.postFeeApi = environment.serverUrl + '/fee';
    this.getFeesApi = environment.serverUrl + '/fee/patron';
    this.updateFeeApi = environment.serverUrl + '/fee/';
    this.getFeesByPatronIdApi = environment.serverUrl + '/fee/';
    this.getFeesByPatronUsernameApi = environment.serverUrl + '/fee/patron/';
  }

  postFee(patId: number, fee: FeeModel): Observable<any>{
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.post<any>(this.postFeeApi + '/' + patId, fee, httpOptions);
  }

  getFees(): Observable<FeeModel[]> {
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.get<FeeModel[]>(this.getFeesApi, httpOptions);
  }

  updateFee(fee: FeeModel): Observable<FeeModel> {
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.put<FeeModel>(this.updateFeeApi + fee.id, fee, httpOptions);
  }

  getFeeByPatron(patronId: number): Observable<FeeModel[]> {
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.get<FeeModel[]>(this.getFeesByPatronIdApi + patronId, httpOptions);
  }

  getFeeByPatronUsername(patronUsername: string): Observable<FeeModel[]> {
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.get<FeeModel[]>(this.getFeesByPatronUsernameApi + patronUsername, httpOptions);
  }

  getAllFees(): Observable<FeeModel[]> {
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.get<FeeModel[]>(this.postFeeApi + '/all', httpOptions);
  }
}
