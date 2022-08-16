import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { checkedoutroom } from '../model/checkedoutroom.model';
import { reservation } from '../model/reservation.model';
import { room } from '../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
    //API Calls
    getRoomsAPI: string;
    getAllRoomsAPI:string;
    makeReserveAPI:string;
    getReserveAPI:string;
    getAllReserveAPI:string;

  constructor(private http:HttpClient) {
    this.getRoomsAPI = "http://localhost:8080/rooms/open?"; 
    this.makeReserveAPI ="http://localhost:8080/reservation/create";
    this.getReserveAPI = "http://localhost:8080/reservation/patron/";
    this.getAllReserveAPI="http://localhost:8080/reservations";
    this.getAllRoomsAPI= "http://localhost:8080/rooms";
  }

  public getOpenRooms(strDate:string,strTime:string):Observable<room[]>{
    //Credentials for API Calls
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    console.log(this.getRoomsAPI+"strDate="+strDate+"&strTime="+strTime);
    console.log(this.http.get<room[]>(this.getRoomsAPI+"strDate="+strDate+"&strTime="+strTime,httpOptions));
    return this.http.get<room[]>(this.getRoomsAPI+"strDate="+strDate+"&strTime="+strTime,httpOptions);
  }

  public makeReservation(reserveRoom: reservation){
    //Credentials for API Calls
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    console.log(this.makeReserveAPI);
    console.log(this.makeReservation);
    return this.http.post(this.makeReserveAPI,this.makeReservation,httpOptions);
  }

  public showReservations(pid:string):Observable<checkedoutroom[]>{
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.get<checkedoutroom[]>(this.getReserveAPI+pid,httpOptions);  
  }

  public showAllReservations():Observable<checkedoutroom[]>{
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.get<checkedoutroom[]>(this.getAllReserveAPI,httpOptions);
  }

  public showAllRooms():Observable<room[]>{
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.get<room[]>(this.getAllRoomsAPI,httpOptions);
  }
}
