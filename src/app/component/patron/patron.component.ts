import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatronEditDto } from 'src/app/auth/model/user.model';
import { Patron } from 'src/app/model/patron.model';
import { PatronService } from 'src/app/service/patron.service';

@Component({
  selector: 'app-patron',
  templateUrl: './patron.component.html',
  styleUrls: ['./patron.component.less']
})
export class PatronComponent implements OnInit,OnDestroy {
  patrons: Patron[];
  subscriptions: Subscription[]=[];
  page:number;
  size: number;
  constructor(private patronService: PatronService) { }

  ngOnInit(): void {
    this.subscriptions=[];
    this.size = 5;
    this.subscriptions.push(
      this.patronService.ppage$.subscribe(value=>{
          this.page = value;
          this.subscriptions.push(
          this.patronService.getAllPatrons(this.page,this.size).subscribe({
            next: (data)=>{
                this.patrons = data;
                this.patronService.patron$.next(this.patrons);
            },
            error: (e)=>{
              //redirect to error page
            }
          })
          );
      })
    );


  }
  onPatronDelete(id : number){
    this.subscriptions.push(
    this.patronService.getAllPatrons(this.page,this.size).subscribe({
      next: (data)=>{
         this.patrons = this.patrons.filter(p=>p.id != id);
         this.patronService.patron$.next(this.patrons);
      },
      error: (e)=>{

      }
  })
  );
 }
 onPatronPut(data : PatronEditDto){
  this.subscriptions.push(
  this.patronService.getAllPatrons(this.page,this.size).subscribe({
    next: (data)=>{
       this.patrons = data;
       this.patronService.patron$.next(this.patrons);
    },
    error: (e)=>{

    }
})
);
}
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

}
