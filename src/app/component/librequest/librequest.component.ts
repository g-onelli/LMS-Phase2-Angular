import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/service/request.service';
import { CompleteRequest, Requests } from 'src/app/model/request.model';

@Component({
  selector: 'app-librequest',
  templateUrl: './librequest.component.html',
  styleUrls: ['./librequest.component.less']
})
export class LibrequestComponent implements OnInit,OnDestroy {

  requests: Requests[];
  subscriptions: Subscription[]=[];
  page:number;
  size: number;
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.subscriptions=[];
    this.size = 5;
    this.subscriptions.push(
      this.requestService.rpage$.subscribe(value=>{
          this.page = value;
          this.requestService.getAllRequests(this.page,this.size).subscribe({
            next: (data)=>{
                this.requests = data;
                this.requestService.request$.next(this.requests);
            },
            error: (e)=>{
              //redirect to error page
            }
          });
      })
    );


  }
  onRequestDelete(id : number){
    this.subscriptions.push(
    this.requestService.getAllRequests(this.page,this.size).subscribe({
      next: (data)=>{
         this.requests = data;
         this.requestService.request$.next(this.requests);
      },
      error: (e)=>{

      }
  })
  );
 }
 onRequestPut(completeRequest: CompleteRequest){
  this.subscriptions.push(
  this.requestService.getAllRequests(this.page,this.size).subscribe({
    next: (data)=>{
       this.requests = data;
       this.requestService.request$.next(this.requests);
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
