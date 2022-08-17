import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { room } from 'src/app/model/room.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.less']
})
export class CreateRoomComponent implements OnInit {
  addRoomForm:FormGroup;
  roomObj:room;
  message: string;

  constructor(private roomservice:RoomService) { }

  ngOnInit(): void {
    this.message="";
    this.addRoomForm = new FormGroup({
      rNum: new FormControl("",[Validators.required,Validators.pattern(/[0-9]/)]),
      cap: new FormControl("",[Validators.required,Validators.pattern(/[0-9]/)]),
      pt: new FormControl("",[Validators.required,Validators.pattern(/[0-9]/)])
    }
    );
  }

  addRoomFunc(){
    console.log(this.addRoomForm.value.rNum)
    this.roomObj={
      roomNumber:this.addRoomForm.value.rNum,
      capacity: this.addRoomForm.value.cap,
      hasPresenterTools: this.addRoomForm.value.pt
    };
    console.log(this.roomObj);
    this.roomservice.addRoomCollection(this.roomObj).subscribe({
      next: (data)=>{
        this.message = "The room has been added to the room collection."
        console.log(this.message);
      },
      error: (err)=>{
        this.message = "The system was not able to add the room."
        console.log(this.message);
      }
    });
    this.resetAll();
  }

  resetAll(){
    this.addRoomForm.reset();
    this.message="";
  }
}
