import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/model/event.model';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.less']
})
export class EventlistComponent implements OnInit {

  events: EventModel[];
  page: number;
  totalPages: number;

  constructor(private eventService : EventService) { }

  ngOnInit(): void {
    this.page = 0;
    this.totalPages = 0;
    this.events = [];
    this.eventService.event$.subscribe(data => {
        this.events = data;
        if(this.events.length > 0) {
          this.totalPages = this.events[0].pages;
        }
    })
  }

  prev() {
    let page = this.eventService.page$.getValue();
    this.page = page -1;
    this.eventService.page$.next(this.page);
  }

  next() {
    let page = this.eventService.page$.getValue();
    if(page<this.totalPages-1){
      //update the value of page
        this.page = page+1;
      }
    this.eventService.page$.next(this.page);
  }

}
