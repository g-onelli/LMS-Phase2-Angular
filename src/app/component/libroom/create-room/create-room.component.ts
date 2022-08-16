import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { room } from 'src/app/model/room.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  addRoomForm:FormGroup;
  roomObj:room;
  message: string;

  constructor(private roomservice:RoomService) { }

  ngOnInit(): void {
    this.addRoomForm = new FormGroup({
      rNum: new FormControl("",[Validators.required,Validators.pattern('\d{3}')]),
      cap: new FormControl("",[Validators.required,Validators.pattern('\d{2}')]),
      pt: new FormControl("",[Validators.required,Validators.pattern('\d{1}')])
    }
    )

    
  }

  addRoomFunc(){
    this.roomObj={
      roomNumber:this.addRoomForm.value.rNum,
      capacity: this.addRoomForm.value.cap,
      hasPresenterTools: this.addRoomForm.value.pt
    }

    this.roomservice.addRoomCollection(this.roomObj).subscribe({
      next: (data)=>{
        this.message = "The room"+ this.addRoomForm.value.rNum +"has been added."
      },
      error: (err)=>{
        this.message = "The system was not able to add the room."
      }
    });
  }
}
