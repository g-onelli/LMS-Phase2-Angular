import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/model/event.model';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.less']
})
export class EventListComponent implements OnInit {

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
    this.page = page +1;
    this.eventService.page$.next(this.page);
  }

}
