import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/service/event.service';
import { FeeService } from 'src/app/service/fee.service';
import { PatronService } from 'src/app/service/patron.service';
import { RequestService } from 'src/app/service/request.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {
 

  numPatrons: number;
  numBookRequests: number;
  totalFees: number;
  reservedRooms: number;
  numEvents: number;
  subscription: Subscription;

  constructor(private primengConfig: PrimeNGConfig,private requestService: RequestService,private patronService: PatronService,private eventService: EventService,private feeService: FeeService) { }
    

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.requestService.getRequests().subscribe({
      next: (data)=>{
        this.numBookRequests = data.length;
      }

    });
    this.patronService.getPatrons().subscribe({
      next: (data)=>{
        this.numPatrons = data.length;
      }

    });
    this.eventService.getEvents().subscribe({
      next: (data)=>{
        this.numEvents = data.length;
      }

    });
    this.feeService.getAllFees().subscribe({
      next: (data)=>{
        this.totalFees = data.length;
      }

    });
  }
ngOnDestroy() {
  if (this.subscription) {
      this.subscription.unsubscribe();
  }
}
}
