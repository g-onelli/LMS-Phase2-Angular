import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { checkedoutroom } from 'src/app/model/checkedoutroom.model';
import { reservation } from 'src/app/model/reservation.model';
import { room } from 'src/app/model/room.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  checkDateForm: FormGroup;
  saveRoomForm:FormGroup;

  //Storage Objects
  roomList: room[];
  reserveObj: reservation;
  reserveList:checkedoutroom[];

  constructor(private roomService: RoomService) { 
    
  }

  ngOnInit(): void {
  }



}
