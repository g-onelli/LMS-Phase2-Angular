import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-delete-room',
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.css']
})
export class DeleteRoomComponent implements OnInit {
  deleteForm:FormGroup;
  message:string;

  constructor(private roomservice:RoomService) { }

  ngOnInit(): void {
    this.deleteForm=new FormGroup({
      rNum: new FormControl("",[Validators.required,Validators.pattern('\d{3}')])
    })
  }
  
  deleteRoomFunc(){
    this.roomservice.deleteRoom(this.deleteForm.value.rNum).subscribe({
      next: (data)=>{
        this.message = "The room"+ this.deleteForm.value.rNum +"has been deleted."
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
