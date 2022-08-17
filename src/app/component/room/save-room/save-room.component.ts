import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { reservation } from 'src/app/model/reservation.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-save-room',
  templateUrl: './save-room.component.html',
  styleUrls: ['./save-room.component.less']
})
export class SaveRoomComponent implements OnInit {
  saveRoomForm:FormGroup;
  reserveObj: reservation;
  check:reservation;
  
  constructor(private roomservice:RoomService) { }

  ngOnInit(): void {
    this.saveRoomForm = new FormGroup({
      pid: new FormControl("",Validators.required),
      rNum: new FormControl("", [Validators.required,Validators.pattern(/[0-9]+/)]),
      strDate: new FormControl("",[Validators.required]),
      time: new FormControl("",[Validators.required,Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
      duration: new FormControl("",[Validators.required,Validators.pattern(/[1-5]/)])
    })
  }

  saveRoom():void{
    console.log(this.saveRoomForm.value.time);
    this.reserveObj={
      patronId: this.saveRoomForm.value.pid,
      roomNumber: this.saveRoomForm.value.rNum,
      duration: this.saveRoomForm.value.duration,
      time: this.saveRoomForm.value.time,
      strDate: this.saveRoomForm.value.strDate
    }
    console.log(this.reserveObj);
    this.roomservice.makeReservation(this.reserveObj).subscribe(data=>{
      this.check=data;
    });
    console.log("We have sent the submission");
  }

}
