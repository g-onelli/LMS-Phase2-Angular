import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkedoutroom } from 'src/app/model/checkedoutroom.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-show-reserve-lib',
  templateUrl: './show-reserve-lib.component.html',
  styleUrls: ['./show-reserve-lib.component.css']
})
export class ShowReserveLibComponent implements OnInit {
  reservations:checkedoutroom[];

  constructor(private roomService:RoomService) { }

  ngOnInit(): void {
  }

  showReserves(){
    console.log();
    this.roomService.showAllReservations().subscribe(data=>{
      this.reservations=data;
    });


  }

}
