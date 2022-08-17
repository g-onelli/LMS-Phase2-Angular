import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { reservation } from 'src/app/model/reservation.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-delete-reserve',
  templateUrl: './delete-reserve.component.html',
  styleUrls: ['./delete-reserve.component.css']
})
export class DeleteReserveComponent implements OnInit {
  deleteReserveForm:FormGroup;
  check: reservation;
  constructor(private roomservice:RoomService) { }

  ngOnInit(): void {
    this.deleteReserveForm = new FormGroup({
      rNum: new FormControl("",[Validators.required,Validators.pattern(/[0-9]+/)]),
      sDate:new FormControl("",Validators.required)
      }
    )
  }

  deleteReserve(){
    this.roomservice.deleteReservation(this.deleteReserveForm.value.rNum,this.deleteReserveForm.value.sDate).subscribe(data=>{
      this.check=data;
    })
  }
}
