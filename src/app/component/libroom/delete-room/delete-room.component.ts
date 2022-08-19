import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-delete-room',
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.less']
})
export class DeleteRoomComponent implements OnInit {
  deleteForm:FormGroup;
  message:string;

  constructor(private roomservice:RoomService) { }

  ngOnInit(): void {
    this.message="";
    this.deleteForm=new FormGroup({
      rNum: new FormControl("",[Validators.required,Validators.pattern(/[0-9]+/)])
    })
  }
  
  deleteRoomFunc(){
    this.roomservice.deleteRoom(this.deleteForm.value.rNum).subscribe({
      next: (data)=>{
        this.message = "Room "+ this.deleteForm.value.rNum +" has been deleted."
        console.log(this.message);
      },
      error: (err)=>{
        this.message = "The system was not able to delete the room."
        console.log(this.message);
      }
    });
  }

  resetAll(){
    this.deleteForm.reset();
    this.message="";
  }
}
