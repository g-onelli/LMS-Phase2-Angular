import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { checkedoutroom } from '../model/checkedoutroom.model';
import { reservation } from '../model/reservation.model';
import { room } from '../model/room.model';
import { updateModel } from '../model/update.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
    //API Calls
      //Get Calls
    getRoomsAPI: string;
    getAllRoomsAPI:string;
    getReserveAPI:string;
    getAllReserveAPI:string;
    getARoomAPI:string;
    getAReservationAPI:string;

      //Post Calls
    makeReserveAPI:string;
    addRoomAPI:string;

      //Put Calls
    updatePatronAPI:string;
    updateDateAPI:string;
    updateRoomAPI:string;
    updateDurationAPI:string;
    editRoomAPI:string;

      //Delete Calls
    deleteReserveAPI:string;
    deleteRoomAPI:string;




/*
Patron:
-Edit reservation
  +date
  +room
  +time
-Make reservation
-Cancel reservation
-View all available rooms
-View all personal reservations

Librarian:
-View all rooms
-View all reservations
-Add room
-Edit reservation
  +patron
-Delete room
-update room
*/


  constructor(private http:HttpClient) {
    this.getRoomsAPI = "http://localhost:8080/rooms/open?"; //Getting all open rooms based on date
    this.makeReserveAPI ="http://localhost:8080/reservation/create"; //creating a reservation
    this.getReserveAPI = "http://localhost:8080/reservation/patron/"; //finding a reservation based on patron
    this.getAllReserveAPI="http://localhost:8080/reservations"; //finding all reservations
    this.getAllRoomsAPI= "http://localhost:8080/rooms"; //finding all rooms
    this.getARoomAPI="http://localhost:8080/rooms/single/"; //getting a specific room by room number
    this.addRoomAPI="http://localhost:8080/rooms/add";

    //Put Calls
    this.updatePatronAPI="http://localhost:8080/reservation/update/patron";
    this.updateDateAPI="http://localhost:8080/reservation/update/date";
    this.updateRoomAPI="http://localhost:8080/reservation/update/room";
    this.updateDurationAPI="http://localhost:8080/reservation/update/duration";
    this.editRoomAPI="http://localhost:8080/rooms/update/";

    //Delete Calls
    this.deleteReserveAPI="http://localhost:8080/reservation/delete";
    this.deleteRoomAPI="http://localhost:8080/rooms/delete/";
    
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

  public showOneRoom(rNum:string):Observable<room>{
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    console.log(this.getARoomAPI+rNum);
    console.log(this.http.get<room>(this.getARoomAPI+rNum,httpOptions));
    return this.http.get<room>(this.getARoomAPI+rNum,httpOptions);
  }

  public makeReservation(reserveRoom: reservation):Observable<any>{
    console.log("We are at service.makeReservation");
    //Credentials for API Calls
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    console.log(this.makeReserveAPI);
    console.log(reserveRoom);
    return this.http.post<any>(this.makeReserveAPI,reserveRoom,httpOptions);
  }

  public addRoomCollection(roomObj:room):Observable<any>{
    console.log("We got in service.addRoom");
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.post<any>(this.addRoomAPI,roomObj,httpOptions);
  }

  public updateResPatron(pid:string,rNum:string):Observable<any>{
    console.log("We got in service.updateResPatron");
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    }; 
    return this.http.put<any>(this.updatePatronAPI+"?pid="+pid+"&rNum="+rNum,httpOptions);
  }

  public updateResDate(obj:updateModel):Observable<any>{
    console.log("We got in service.updateResDate");
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.put<any>(this.updateDateAPI,obj,httpOptions);
  }

  public updateResRoom(obj:updateModel):Observable<any>{
    console.log("We got in service.updateresroom");
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.put<any>(this.updateRoomAPI,obj,httpOptions);
  }

  public updateResDuration(obj:updateModel):Observable<any>{
    console.log("We got in service.updateresduration");
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.put<any>(this.updateDurationAPI,obj,httpOptions);
  }

  public editOldRoom(rNum:string,roomObj:room):Observable<any>{
    console.log("We got in service.editoldroom");
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.put<any>(this.editRoomAPI+rNum,roomObj,httpOptions);
  }

  public deleteReservation(rNum:string,sDate:string):Observable<any>{
    console.log("We got in service.deletereservation");
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    console.log(this.deleteReserveAPI+"?rNum="+rNum+"&strDate="+sDate);
    return this.http.delete<any>(this.deleteReserveAPI+"?rNum="+rNum+"&strDate="+sDate,httpOptions);
  }

  public deleteRoom(rNum:number):Observable<reservation>{
    console.log("We got in service.deleteRoom");
    let encodedCredentials = localStorage.getItem('credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'basic ' + encodedCredentials
      })
    };
    return this.http.delete<reservation>(this.deleteRoomAPI+rNum,httpOptions);
  }


}
