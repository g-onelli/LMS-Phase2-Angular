import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { reservation } from 'src/app/model/reservation.model';
import { room } from 'src/app/model/room.model';
import { updateModel } from 'src/app/model/update.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-change-reserve',
  templateUrl: './change-reserve.component.html',
  styleUrls: ['./change-reserve.component.css']
})
export class ChangeReserveComponent implements OnInit {
  changeResForm:FormGroup;
  check:reservation;
  updateObj:updateModel;
  constructor(private roomService:RoomService) { }

  ngOnInit(): void {
    this.changeResForm=new FormGroup(
      {
        rNum: new FormControl("",[Validators.required,Validators.pattern(/[0-9]+/)]),
        changeValue: new FormControl("",[Validators.required,Validators.pattern(/[length|date|room]/)]),
        nNum:new FormControl("",Validators.pattern(/[0-9]+/)),
        sDate: new FormControl("",),
        strTime:new FormControl("",Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)),
        durT:new FormControl("",[Validators.required,Validators.pattern(/[1-5]/)])
      }
    )
  }

  changeReserve(){
    switch(this.changeResForm.value.changeValue){
      case "date":{
        this.updateObj={
          roomNum:this.changeResForm.value.rNum,
          strDate:this.changeResForm.value.sDate,
          intValue:0
        }
        this.roomService.updateResDate(this.updateObj).subscribe(data=>{
          this.check=data;
        });
        break;
      }
      case "room":{
        this.updateObj={
          roomNum:this.changeResForm.value.rNum,
          strDate:"",
          intValue:this.changeResForm.value.nNum
        }
        this.roomService.updateResRoom(this.updateObj).subscribe(data=>{
          this.check=data;
        });
        break;
      }
      case "length":{
        this.updateObj={
          roomNum:this.changeResForm.value.rNum,
          strDate:"",
          intValue:this.changeResForm.value.durT
        }
        this.roomService.updateResDuration(this.updateObj).subscribe(data=>{
          this.check=data;
        });
        break;
      }
      default:{
        console.log("The case did not match anything");
        break;
      }
    }
  }
}
