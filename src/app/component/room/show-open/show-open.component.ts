import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { room } from 'src/app/model/room.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-show-open',
  templateUrl: './show-open.component.html',
  styleUrls: ['./show-open.component.less']
})
export class ShowOpenComponent implements OnInit {
  checkDateForm: FormGroup;

  //Storage Objects
  roomList: room[];


  constructor(private roomService: RoomService) { 
    
  }

  ngOnInit(): void {
    this.checkDateForm = new FormGroup({
      date: new FormControl("",[Validators.required]),
      time: new FormControl("",
      [Validators.required,
        Validators
        .pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)])
    })
  }

  newRoomData(){

    let convertDate = this.checkDateForm.value.date;
    let convertTime = this.checkDateForm.value.time;
    let strDate = convertDate.toString();
    let strTime = convertTime.toString();
    console.log(typeof strDate);
    this.roomService.getOpenRooms(strDate,
      strTime).subscribe(data=> {
      this.roomList = data;
      console.log(this.roomList);
      console.log(this.roomList!=[]);
    })
  }

}
