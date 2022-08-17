import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { checkedoutroom } from 'src/app/model/checkedoutroom.model';
import { reservation } from 'src/app/model/reservation.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-show-reserve',
  templateUrl: './show-reserve.component.html',
  styleUrls: ['./show-reserve.component.less']
})
export class ShowReserveComponent implements OnInit {
  formOne: FormGroup;
  reservations:checkedoutroom[];
  message: string;
  bool:boolean;

  constructor(private roomService:RoomService) { }

  ngOnInit(): void {
    this.message='';
    this.formOne= new FormGroup(
      {pid: new FormControl("",Validators.required)}
    );
  }

  showReserve(){
    console.log(this.formOne.value.pid);
    this.roomService.showReservations(this.formOne.value.pid).subscribe({
      next: (data)=>{
        this.message="Your reservation has been cancelled";
        this.reservations=data;
      },
      error: (err)=>{
        this.message = "The system was unable to cancel the reservation."
        console.log(this.message);
      }
    });
    
    
  }

  emptyMsg(){
    this.message = "";
    this.bool=false;
    window.location.reload();
  }

  resetAll(){
    this.formOne.reset();
    this.reservations=[];
    this.message="";
  }

}
