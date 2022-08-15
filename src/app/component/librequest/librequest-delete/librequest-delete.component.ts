import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Requests } from 'src/app/model/request.model';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-librequest-delete',
  templateUrl: './librequest-delete.component.html',
  styleUrls: ['./librequest-delete.component.less']
})
export class LibrequestDeleteComponent implements OnInit,OnDestroy {

  requestForm :FormGroup;
  request: Requests;
  msg: string;
  id: number;
  subscriptions: Subscription[]=[];
  @Output()
  deleteRequestEmitter = new EventEmitter();
  constructor(private requestService: RequestService) { }

  
  ngOnInit(): void {
    this.requestForm = new FormGroup({
      id: new FormControl('', [Validators.required,Validators.pattern(/^[0-9 ]+$/)])
    });
  }
onFormSubmit(){
  this.id = this.requestForm.value.id;
  this.subscriptions.push(
  this.requestService.deleteRequest(this.id).subscribe({
    next: (data)=>{
      this.msg='Request deleted in the system';
      this.deleteRequestEmitter.emit(this.id);
      this.requestForm.reset();
    },
    error: (e)=>{
      this.msg='Operation failed';
      
    }
  })
  );
}
ngOnDestroy(): void {
  this.subscriptions.forEach(sub=>sub.unsubscribe());
}

}
