import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { room } from 'src/app/model/room.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.less']
})
export class ShowRoomComponent implements OnInit {
  roomList:room[];
  room:room;
  showOneRoomForm:FormGroup;
  message: string;
  constructor(private roomServices:RoomService) { }

  ngOnInit(): void {
    this.message="";
    this.showOneRoomForm=new FormGroup({
      rNum: new FormControl("",Validators.required)}
    );
    
    this.roomServices.showAllRooms().subscribe(data=>{
        this.roomList=data;
      });
    }

  showSingleRoom(){
    console.log(this.showOneRoomForm.value.rNum);
    this.roomServices.showOneRoom(this.showOneRoomForm.value.rNum).subscribe({
      next: (data)=>{
        this.room=data;
      },
      error: (err)=>{
        this.message = "The system was unable to find this room."
        console.log(this.message);
      }
    });
    this.resetAll();
  }

  resetAll(){
    this.showOneRoomForm.reset();
    this.message="";
  }

}


