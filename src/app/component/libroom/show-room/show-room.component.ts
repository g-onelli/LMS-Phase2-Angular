import { Component, OnInit } from '@angular/core';
import { room } from 'src/app/model/room.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.css']
})
export class ShowRoomComponent implements OnInit {
  roomList:room[];
  constructor(private roomServices:RoomService) { }

  ngOnInit(): void {
  }

  showAllRooms(){
    this.roomServices.showAllRooms().subscribe(data=>{
      this.roomList=data;
    })
  }

}
